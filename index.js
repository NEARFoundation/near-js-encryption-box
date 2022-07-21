const { utils } = require("near-api-js");
const { convertPublicKey, convertSecretKey } = require("ed2curve");
const { encodeBase64, decodeBase64, decodeUTF8 } = require("tweetnacl-util");
const { baseDecode } = require("borsh");

console.log("[near-js-encryption-box] Starting proof of concept");

const keyPairSender = utils.key_pair.KeyPairEd25519.fromRandom();
const keyPairReceiver = utils.key_pair.KeyPairEd25519.fromRandom();

const convertedPublicKeyReceiver = convertPublicKey(
  keyPairReceiver.getPublicKey().data
);

const privateAndPublicKeySender = decodeBase64(
  baseDecode(keyPairSender.secretKey).toString("base64")
);

const privateKeySender = privateAndPublicKeySender.slice(0, 32);

const convertedPrivateKeySender = convertSecretKey(privateKeySender);
