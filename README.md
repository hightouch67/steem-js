# Steem-JS Updated

An updated JavaScript library for the Steem blockchain with modernized dependencies and fixed ESM/CommonJS compatibility issues.

## Installation

```bash
npm install steem-js-updated
```

## Usage

```javascript
const steem = require('steem-js-updated');

// Connect to a Steem API node
steem.api.setOptions({
  url: 'https://api.steemit.com'
});

// Fetch blockchain data
steem.api.getAccounts(['username'], (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});

// Create and verify signatures
const { PrivateKey, PublicKey } = steem.auth.ecc;
const privateKey = PrivateKey.fromSeed('your-seed');
const publicKey = privateKey.toPublic();

// Handle encrypted memos
const memo = '#encrypted memo';
const encrypted = steem.memo.encode(privateKey, publicKey, memo);
const decrypted = steem.memo.decode(privateKey, encrypted);
```

## Available Functions

### API

- `steem.api.getAccounts()`
- `steem.api.getConfig()`
- `steem.api.getDynamicGlobalProperties()`
- ... and more blockchain API methods

### Auth

- `steem.auth.getPrivateKeys()`
- `steem.auth.isWif()`
- `steem.auth.toWif()`
- `steem.auth.wifToPublic()`
- `steem.auth.signTransaction()`

### Crypto

- `steem.auth.ecc.PrivateKey.fromSeed()`
- `steem.auth.ecc.PrivateKey.fromWif()`
- `steem.auth.ecc.PublicKey.fromString()`

### Broadcast

- `steem.broadcast.vote()`
- `steem.broadcast.comment()`
- `steem.broadcast.transfer()`
- ... and other blockchain operations

## Changes from Original Steem-JS

1. Fixed ESM/CommonJS compatibility issues
2. Updated dependencies to modern versions
3. Fixed ByteBuffer dependency issues
4. Enhanced test suite reliability
5. Improved build process

## Docker Support

This project includes Docker support for testing and development across different Node.js versions (16, 18, and 20).

To run tests using Docker:

```bash
npm run docker:test
```

For more information about Docker support, see [DOCKER.md](DOCKER.md).

## License

MIT 