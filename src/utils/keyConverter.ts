import { convertPublicKey, convertSecretKey } from 'ed2curve';
import { decodeBase64 } from 'tweetnacl-util';
import { baseDecode } from 'borsh';

export const parseAndConvertPublicKey = (
  publicKey: string
): Uint8Array | null => {
  const publicKeyBytes = decodeBase64(
    baseDecode(publicKey.replace('ed25519:', '')).toString('base64')
  );
  const convertedPublicKey = convertPublicKey(publicKeyBytes);
  return convertedPublicKey;
};

export const parseAndConvertPrivateKey = (
  privateKey: string
): Uint8Array | null => {
  const privateKeyOnly = privateKey.replace('ed25519:', '');
  const privateKeyBytes =
    privateKeyOnly.length === 64
      ? decodeBase64(Buffer.from(privateKeyOnly, 'hex').toString('base64'))
      : decodeBase64(baseDecode(privateKeyOnly).toString('base64'));
  const convertedPrivateKey = convertSecretKey(privateKeyBytes.slice(0, 32));
  return convertedPrivateKey;
};
