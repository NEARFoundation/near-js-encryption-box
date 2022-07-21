const { utils } = require("near-api-js");
const { convertPublicKey, convertSecretKey } = require("ed2curve");

console.log("[near-js-encryption-box] Starting proof of concept");

const keyPairSender = utils.key_pair.KeyPairEd25519.fromRandom();
const keyPairReceiver = utils.key_pair.KeyPairEd25519.fromRandom();

const convertedPublicKeyReceiver = convertPublicKey(
  keyPairReceiver.getPublicKey().data
);

console.log(keyPairSender);
