# near-js-encryption-box [![NEAR](https://img.shields.io/badge/NEAR-%E2%8B%88-111111.svg)](https://near.org/) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> An experimental library to encrypt and decrypt data using the NEAR account's ed25519 keypairs; you can use it to store encrypted data on-chain, off-chain, or in any decentralized storage (IPFS, Arweave).

⚠️ This is an experimental library. We do not recommend to use it to store confidential information publically.

## Installation

```bash
npm install @nearfoundation/near-js-encryption-box
```

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
const { secret, nonce } = create(message, publicKeyBob, privateKeyAlice); // you can also pass your own custom nonce as a 4th parameter

// Decrypting the message
const publicKeyAlice = keyPairAlice.getPublicKey().toString();
const privateKeyBob = keyPairBob.secretKey;
const messageReceived = open(secret, publicKeyAlice, privateKeyBob, nonce);
console.log(messageReceived); // will return 'Hello Bob'
```

Find more examples in the [near-js-encryption-box-test.ts](test/near-js-encryption-box.test.ts)

## Encryption

- Convert NEAR Ed25519 signing key pair into Curve25519 key pair suitable for Diffie-Hellman key; using [ed2curve.js](https://github.com/dchest/ed2curve-js)
  - "Note that there's currently no proof that this is safe to do. It is safer to share both Ed25519 and Curve25519 public keys (their concatenation is 64 bytes long)."
- Then uses Curve25519-XSalsa20-Poly1305 implemented by [TweetNaCl.js](https://tweetnacl.js.org)

## Authors

- [Sandoche](https://github.com/sandoche)

## License

MIT License
