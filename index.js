const { utils } = require("near-api-js");
const { convertPublicKey, convertSecretKey } = require("ed2curve");
const { encodeBase64, decodeBase64, decodeUTF8 } = require("tweetnacl-util");
const { baseDecode } = require("borsh");
const { box } = require("tweetnacl");
const randomBytes = require("random-bytes");

console.log("[near-js-encryption-box] Encoding secret message");

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

const message = "Hello world";

const messageEncoded = decodeUTF8(message);
const nonceEncoded = randomBytes.sync(24);

const secret = box(
  messageEncoded,
  nonceEncoded,
  convertedPublicKeyReceiver,
  convertedPrivateKeySender
);
const secretString = encodeBase64(secret);

console.log("[near-js-encryption-box] Secret:", secretString);
console.log("[near-js-encryption-box] Nonce:", nonceEncoded.toString("base64"));
