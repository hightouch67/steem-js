/**
 * Examples for using the Steem crypto and auth modules
 */

const steem = require('../lib');

console.log('Steem Crypto and Auth Examples\n');

// Generate keys from username and password
console.log('1. Generate keys from username and password:');
const keys = steem.auth.generateKeys('username', 'password');
console.log(JSON.stringify(keys, null, 2));
console.log();

// Validate a WIF format private key
console.log('2. Validate a WIF format private key:');
const wif = keys.posting.private;
const isValidWif = steem.auth.isWif(wif);
console.log(`Is valid WIF: ${isValidWif}`);
console.log();

// Derive public key from private key
console.log('3. Derive public key from private key:');
const publicKey = steem.auth.wifToPublic(wif);
console.log(`Public key: ${publicKey}`);
console.log();

// Sign a message
console.log('4. Sign a message:');
const message = 'Hello, Steem!';
const signature = steem.auth.sign(message, wif);
console.log(`Message: ${message}`);
console.log(`Signature: ${signature}`);
console.log();

// Verify a signature
console.log('5. Verify a signature:');
const isValid = steem.auth.verify(message, signature, publicKey);
console.log(`Signature is valid: ${isValid}`);
console.log();

// Sign a transaction
console.log('6. Sign a transaction:');
const transaction = {
  ref_block_num: 12345,
  ref_block_prefix: 67890,
  expiration: '2023-04-15T12:00:00',
  operations: [
    ['vote', {
      voter: 'username',
      author: 'steemitblog',
      permlink: 'welcome-to-steem',
      weight: 10000
    }]
  ],
  extensions: []
};

const signedTransaction = steem.auth.signTransaction(transaction, wif);
console.log('Transaction signed. Signatures:');
console.log(JSON.stringify(signedTransaction.signatures, null, 2));
console.log();

// Check if a username is valid
console.log('7. Check if a username is valid:');
const isValidUsername = steem.auth.isValidUsername('username');
console.log(`Username 'username' is valid: ${isValidUsername}`);
const isInvalidUsername = steem.auth.isValidUsername('Invalid_User123');
console.log(`Username 'Invalid_User123' is valid: ${isInvalidUsername}`);
console.log();

console.log('All examples completed successfully!'); 