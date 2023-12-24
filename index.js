const pino = require("pino");
const fs = require('fs');
const chalk = require("chalk");
const NodeCache = require('node-cache');
const readline = require("readline");
const MAIN_LOGGER = pino({
  'timestamp': () => ",\"time\":\"" + new Date().toJSON() + "\""
});
const logger = MAIN_LOGGER.child({});
logger.level = "trace";
undefined?.["readFromFile"]("./session");
setInterval(() => {
  undefined?.['writeToFile']("./session");
}, 60000);
const msgRetryCounterCache = new NodeCache();
const rl = readline.createInterface({
  'input': process.stdin,
  'output': process.stdout
});
const question = _0x4ba6eb => new Promise(_0x2e75f1 => rl.question(_0x4ba6eb, _0x2e75f1));
const P = require('pino')({
  'level': 'silent'
});
async function startWeshed() {
  const {
    state: _0x2ac09d,
    saveCreds: _0x363089
  } = await useMultiFileAuthState('session');
  let {
    version: _0xfb2c88,
    isLatest: _0x180e88
  } = await fetchLatestBaileysVersion();
  console.log(chalk.redBright("using WA v" + _0xfb2c88.join('.') + ", isLatest: " + _0x180e88));
  const _0x1e43db = makeWASocket({
    'version': _0xfb2c88,
    'logger': P,
    'printQRInTerminal': false,
    'mobile': false,
    'browser': ["chrome (linux)", '', ''],
    'auth': {
      'creds': _0x2ac09d.creds,
      'keys': makeCacheableSignalKeyStore(_0x2ac09d.keys, P)
    },
    'msgRetryCounterCache': msgRetryCounterCache,
    'getMessage': async _0x4cac6b => {
      if (undefined) {
        const _0x60039e = await undefined.loadMessage(_0x4cac6b.remoteJid, _0x4cac6b.id);
        return _0x60039e.message || undefined;
      }
    }
  });
  undefined?.['bind'](_0x1e43db.ev);
  if (true && !_0x1e43db.authState.creds.registered) {
    const _0x103081 = await question("Please enter the Whatsapp account number you want to link:\n");
    const _0x2ed902 = await _0x1e43db.requestPairingCode(_0x103081);
    console.log("Pairing code: " + _0x2ed902);
    console.log(chalk.green("Copy the above pairing code and use it to link the bot using phone number"));
  }
  const _0x29d840 = new Map();
  process.on('unhandledRejection', (_0x294914, _0x10cc30) => {
    _0x29d840.set(_0x10cc30, _0x294914);
    console.log("Unhandled Rejection at:", _0x10cc30, 'reason:', _0x294914);
  });
  process.on('rejectionHandled', _0x14f91b => {
    _0x29d840["delete"](_0x14f91b);
  });
  process.on("Something went wrong", function (_0x4e05e9) {
    console.log("Caught exception: ", _0x4e05e9);
  });
  _0x1e43db.autosw = true;
  _0x1e43db.mokaya = "254102822319@s.whatsapp.net";
  _0x1e43db.serializeM = _0x1b13a0 => smsg(_0x1e43db, _0x1b13a0, undefined);
  _0x1e43db.ev.on("connection.update", async _0x2be3ab => {
    if (_0x4bf921 == "undefined") {
      askForOTP();
    }
    if (_0x2a5d7d === "connecting") {
      console.log(chalk.blue("Connecting..."));
      console.log("[WESHED] Bot is linked to WebSocket.");
    } else {
      if (_0x2a5d7d === "open") {
        await delay(10000);
        console.log(chalk.green("You successfully connected to the WebSocket."));
        await _0x1e43db.sendMessage(_0x1e43db.mokaya, {
          'text': "Successfully I am connected to web!! I am Weshed-AI an advanced whatsapp Bot by MG-WESH!"
        });
        await _0x1e43db.sendMessage(_0x1e43db.user.id, {
          'text': "Sending login credentials now..."
        });
        await _0x1e43db.sendMessage(_0x1e43db.user.id, {
          'text': "Wait a moment..."
        });
        let _0x3f35f8 = await fs.readFileSync(__dirname + "/session/creds.json");
        await delay(3000);
        let _0x43bb43 = await _0x1e43db.sendMessage(_0x1e43db.user.id, {
          'document': _0x3f35f8,
          'fileName': "creds.json",
          'mimetype': "application/json"
        });
        await _0x1e43db.sendMessage(_0x1e43db.user.id, {
          'text': "Weshed-AI has been linked to your WhatsApp account! Do not share the document above with anyone. \n\nWait for Bot deployment if indicate Active means running!  Wait? if not logged please inform me to relink!"
        }, {
          'quoted': _0x43bb43
        });
      } else if (_0x2a5d7d === "close") {
        if (_0x4bf921.error.output.statusCode == DisconnectReason.loggedOut) {
          console.log(chalk.redBright("Disconnected! Check if account is active and retry"));
          _0x1e43db.sendMessage(_0x1e43db.mokaya, {
            'text': "Bot is disconnected"
          });
          process.exit(0x0);
        } else {
          startWeshed()["catch"](() => startWeshed());
        }
      }
    }
  });
  _0x1e43db.ev.on("creds.update", _0x363089);
}
startWeshed();