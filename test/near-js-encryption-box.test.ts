import { create, open } from './../src';
import { utils } from 'near-api-js';

describe('Creating a secret box with Alice and Bob key pairs randomly generated from NEAR JS LIBRARY', () => {
  const keyPairAlice = utils.key_pair.KeyPairEd25519.fromRandom();
  const keyPairBob = utils.key_pair.KeyPairEd25519.fromRandom();

  it('Should the message open should be the same as the message sent', () => {
    const messageSent = 'Hello world';

    const publicKeyBob = keyPairBob.getPublicKey().toString();
    const privateKeyAlice = keyPairAlice.secretKey;

    const { secret, nonce } = create(
      messageSent,
      publicKeyBob,
      privateKeyAlice
    );

    const publicKeyAlice = keyPairAlice.getPublicKey().toString();
    const privateKeyBob = keyPairBob.secretKey;

    const messageReceived = open(secret, publicKeyAlice, privateKeyBob, nonce);

    expect(messageSent).toBe(messageReceived);
  });
});

describe('Creating a secret box with Alice and Bob key pairs generated with NEAR CLI', () => {
  const keyPairAlice = {
    publicKey: 'ed25519:d9ymaE7DT8ydtEvxgfs4UERofMF749szvniWTRQJBBh',
    privateKey:
      '09430fbb4310e17cec8c8639d6b2c6c59c28ca5c9fdd9680834737aa1aeadfec',
  };

  const keyPairBob = {
    publicKey: 'ed25519:d9ymaE7DT8ydtEvxgfs4UERofMF749szvniWTRQJBBh',
    privateKey:
      '09430fbb4310e17cec8c8639d6b2c6c59c28ca5c9fdd9680834737aa1aeadfec',
  };

  it('Should the message open should be the same as the message sent', () => {
    const messageSent = 'Hello world';

    const publicKeyBob = keyPairBob.publicKey;
    const privateKeyAlice = keyPairAlice.privateKey;

    const { secret, nonce } = create(
      messageSent,
      publicKeyBob,
      privateKeyAlice
    );

    const publicKeyAlice = keyPairAlice.publicKey;
    const privateKeyBob = keyPairBob.privateKey;

    const messageReceived = open(secret, publicKeyAlice, privateKeyBob, nonce);

    expect(messageSent).toBe(messageReceived);
  });
});

describe('Creating a secret box with Alice and Bob key pairs having ed25519: prefix', () => {
  const keyPairAlice = {
    publicKey: 'ed25519:d9ymaE7DT8ydtEvxgfs4UERofMF749szvniWTRQJBBh',
    privateKey:
      'ed25519:09430fbb4310e17cec8c8639d6b2c6c59c28ca5c9fdd9680834737aa1aeadfec',
  };

  const keyPairBob = {
    publicKey: 'ed25519:d9ymaE7DT8ydtEvxgfs4UERofMF749szvniWTRQJBBh',
    privateKey:
      'ed25519:09430fbb4310e17cec8c8639d6b2c6c59c28ca5c9fdd9680834737aa1aeadfec',
  };

  it('Should the message open should be the same as the message sent', () => {
    const messageSent = 'Hello world';

    const publicKeyBob = keyPairBob.publicKey;
    const privateKeyAlice = keyPairAlice.privateKey;

    const { secret, nonce } = create(
      messageSent,
      publicKeyBob,
      privateKeyAlice
    );

    const publicKeyAlice = keyPairAlice.publicKey;
    const privateKeyBob = keyPairBob.privateKey;

    const messageReceived = open(secret, publicKeyAlice, privateKeyBob, nonce);

    expect(messageSent).toBe(messageReceived);
  });
});

describe('Creating a secret box with Alice and Bob key pairs without ed25519: prefix', () => {
  const keyPairAlice = {
    publicKey: 'd9ymaE7DT8ydtEvxgfs4UERofMF749szvniWTRQJBBh',
    privateKey:
      '09430fbb4310e17cec8c8639d6b2c6c59c28ca5c9fdd9680834737aa1aeadfec',
  };

  const keyPairBob = {
    publicKey: 'd9ymaE7DT8ydtEvxgfs4UERofMF749szvniWTRQJBBh',
    privateKey:
      '09430fbb4310e17cec8c8639d6b2c6c59c28ca5c9fdd9680834737aa1aeadfec',
  };

  it('Should the message open should be the same as the message sent', () => {
    const messageSent = 'Hello world';

    const publicKeyBob = keyPairBob.publicKey;
    const privateKeyAlice = keyPairAlice.privateKey;

    const { secret, nonce } = create(
      messageSent,
      publicKeyBob,
      privateKeyAlice
    );

    const publicKeyAlice = keyPairAlice.publicKey;
    const privateKeyBob = keyPairBob.privateKey;

    const messageReceived = open(secret, publicKeyAlice, privateKeyBob, nonce);

    expect(messageSent).toBe(messageReceived);
  });
});

describe('Creating a secret box for Alice only', () => {
  const keyPairAlice = utils.key_pair.KeyPairEd25519.fromRandom();

  it('Should the message open should be the same as the message sent', () => {
    const messageSent = 'Hello world';

    const privateKeyAlice = keyPairAlice.secretKey;
    const publicKeyAlice = keyPairAlice.getPublicKey().toString();

    const { secret, nonce } = create(
      messageSent,
      publicKeyAlice,
      privateKeyAlice
    );

    const messageReceived = open(
      secret,
      publicKeyAlice,
      privateKeyAlice,
      nonce
    );

    expect(messageSent).toBe(messageReceived);
  });
});
