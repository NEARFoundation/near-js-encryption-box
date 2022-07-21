const { utils } = require("near-api-js");
const { convertPublicKey, convertSecretKey } = require("ed2curve");
const { encodeBase64, decodeBase64, decodeUTF8 } = require("tweetnacl-util");
const { baseDecode } = require("borsh");
const { box } = require("tweetnacl");
const randomBytes = require("random-bytes");

console.log("[near-js-encryption-box] Creating two keypairs");

const keyPairSender = utils.key_pair.KeyPairEd25519.fromRandom();
const keyPairReceiver = utils.key_pair.KeyPairEd25519.fromRandom();

console.log("[near-js-encryption-box] Encoding secret message");

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

console.log("[near-js-encryption-box] Creating the box", {
  message,
  nonce: nonceEncoded.toString("base64"),
  publicKey: encodeBase64(convertedPublicKeyReceiver),
  privateKey: encodeBase64(convertedPrivateKeySender),
});

const secret = box(
  messageEncoded,
  nonceEncoded,
  convertedPublicKeyReceiver,
  convertedPrivateKeySender
);
const secretString = encodeBase64(secret);
const nonceString = nonceEncoded.toString("base64");

console.log("[near-js-encryption-box] Secret:", secretString);
console.log("[near-js-encryption-box] Nonce:", nonceString);

console.log("[near-js-encryption-box] Decoding secret message");

const secretEncoded = decodeBase64(secretString);
const nonceEncodedFromString = decodeBase64(nonceString);

const privateKeyReceiver = decodeBase64(
  baseDecode(keyPairReceiver.secretKey).toString("base64")
);
const convertedPrivateKeyReceiver = convertSecretKey(
  privateKeyReceiver.slice(0, 32)
);
const convertedPublicKeySender = convertPublicKey(
  keyPairSender.getPublicKey().data
);

console.log("[near-js-encryption-box] Decoding the box", {
  secretString,
  nonceString,
  publicKey: encodeBase64(convertedPublicKeySender),
  privateKey: encodeBase64(convertedPrivateKeyReceiver),
});

const secretDecoded = box.open(
  secretEncoded,
  nonceEncodedFromString,
  convertedPublicKeySender,
  convertedPrivateKeyReceiver
);

console.log(
  "[near-js-encryption-box] Message:",
  encodeBase64(secretDecoded).toString("base64")
);
