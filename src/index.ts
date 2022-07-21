import { convertPublicKey, convertSecretKey } from 'ed2curve';
import {
  encodeBase64,
  decodeBase64,
  decodeUTF8,
  encodeUTF8,
} from 'tweetnacl-util';
// import { baseDecode } from 'borsh';
import { box } from 'tweetnacl';
import randomBytes from 'random-bytes';

export const create = (
  message: string,
  publicKey: string,
  privateKey: string
): { secret: string; nonce: string } => {
  const publicKeyBytes = decodeBase64(publicKey.replace('ed25519:', ''));
  const privateKeyBytes = decodeBase64(privateKey.replace('ed25519:', ''));
  const convertedPublicKey = convertPublicKey(publicKeyBytes);
  const convertedPrivateKey = convertSecretKey(privateKeyBytes.slice(0, 32));

  const encodedMessage = decodeUTF8(message);
  const encodedNonce = randomBytes.sync(24);

  if (!convertedPublicKey || !convertedPrivateKey) {
    throw new Error('Invalid public or private key');
  }

  const secret = box(
    encodedMessage,
    encodedNonce,
    convertedPublicKey,
    convertedPrivateKey
  );

  return {
    secret: encodeBase64(secret),
    nonce: encodeBase64(encodedNonce),
  };
};

export const open = (
  secret: string,
  publicKey: string,
  privateKey: string,
  nonce: string
): string | null => {
  const publicKeyBytes = decodeBase64(publicKey.replace('ed25519:', ''));
  const privateKeyBytes = decodeBase64(privateKey.replace('ed25519:', ''));
  const convertedPublicKey = convertPublicKey(publicKeyBytes);
  const convertedPrivateKey = convertSecretKey(privateKeyBytes.slice(0, 32));

  const encodedSecret = decodeBase64(secret);
  const encodedNonce = decodeBase64(nonce);

  if (!convertedPublicKey || !convertedPrivateKey) {
    throw new Error('Invalid public or private key');
  }

  const secretDecoded = box.open(
    encodedSecret,
    encodedNonce,
    convertedPublicKey,
    convertedPrivateKey
  );

  return secretDecoded ? encodeUTF8(secretDecoded) : null;
};
