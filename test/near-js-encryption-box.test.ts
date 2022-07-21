import { create, open } from './../src';
import { utils } from 'near-api-js';
import { encodeBase64 } from 'tweetnacl-util';

describe('Creating a secret box with Alice and Bob key pairs and verify the secret', () => {
  const keyPairAlice = utils.key_pair.KeyPairEd25519.fromRandom();
  const keyPairBob = utils.key_pair.KeyPairEd25519.fromRandom();

  it('Should the message open should be the same as the message sent', () => {
    const messageSent = 'Hello world';

    const publicKeyAlice = encodeBase64(keyPairAlice.getPublicKey().data);
    const privateKeyBob = keyPairBob.secretKey;

    const { secret, nonce } = create(
      messageSent,
      publicKeyAlice,
      privateKeyBob
    );

    const publicKeyBob = encodeBase64(keyPairBob.getPublicKey().data);
    const privateKeyAlice = keyPairAlice.secretKey;

    const messageReceived = open(secret, publicKeyBob, privateKeyAlice, nonce);

    expect(messageSent).toBe(messageReceived);
  });
});
