# near-js-encryption-box

> An experimental library to encrypt and decrypt data using the NEAR account's ed25519 keypairs; you can use it to store encrypted data on-chain, off-chain, or in any decentralized storage (IPFS, Arweave).

⚠️ This is an experimental library. We do not recommend to use it to store confidential information publically.

## Projects using this library

Coming soon

## Installation

```bash
npm install https://github.com/sandoche/near-js-encryption-box
```

> This package has not been published to npm yet.

## Usage

You can find below an example where Alice encrypt data with her private key and Bob's public key.
Then Bob can decrypt the message with his private key, Alice's public key and a nonce.

```js
import { create, open } from 'near-js-encryption-box';
import { utils } from 'near-api-js';

// Randomly generating key pairs for the example
const keyPairAlice = utils.key_pair.KeyPairEd25519.fromRandom();
const keyPairBob = utils.key_pair.KeyPairEd25519.fromRandom();

// Encrypting a message
const message = 'Hello Bob';
const publicKeyBob = keyPairBob.getPublicKey().toString();
const privateKeyAlice = keyPairAlice.secretKey;
const { secret, nonce } = create(message, publicKeyBob, privateKeyAlice); // you can also pass your own custom nonce as a 4th paramter

// Decrypting the message
const publicKeyAlice = keyPairAlice.getPublicKey().toString();
const privateKeyBob = keyPairBob.secretKey;
const messageReceived = open(secret, publicKeyAlice, privateKeyBob, nonce);
console.log(messageReceived); // will return 'Hello Bob'
```

Find more examples in the [near-js-encryption-box-test.ts](test/near-js-encryption-box.test.ts)

## Authors

- [Sandoche](https://github.com/sandoche)

## License

MIT License
