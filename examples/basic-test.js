const steem = require('../lib');

// Test authentication
function testAuth() {
  try {
    const { PrivateKey, PublicKey } = steem.auth.ecc;
    
    // Generate keys from a seed
    const privateKey = PrivateKey.fromSeed("test-seed");
    const publicKey = privateKey.toPublic();
    
    console.log('✓ Auth test passed');
    console.log('  Private key:', privateKey.toWif());
    console.log('  Public key:', publicKey.toString());
    return true;
  } catch (error) {
    console.error('✗ Auth test failed:', error.message);
    return false;
  }
}

// Test memo encryption/decryption
function testMemo() {
  try {
    const { PrivateKey, PublicKey } = steem.auth.ecc;
    const privateKey = PrivateKey.fromSeed("test-seed");
    const publicKey = privateKey.toPublic();
    
    const memo = '#testing memo encryption';
    const encrypted = steem.memo.encode(privateKey, publicKey, memo);
    const decrypted = steem.memo.decode(privateKey, encrypted);
    
    if (decrypted !== memo) {
      throw new Error('Decrypted memo does not match original');
    }
    
    console.log('✓ Memo test passed');
    console.log('  Original memo:', memo);
    console.log('  Encrypted memo:', encrypted.substring(0, 30) + '...');
    return true;
  } catch (error) {
    console.error('✗ Memo test failed:', error.message);
    return false;
  }
}

// Run the tests
console.log('Running basic steem-js tests...\n');
const authPassed = testAuth();
const memoPassed = testMemo();

if (authPassed && memoPassed) {
  console.log('\nAll tests passed! The library is working correctly.');
} else {
  console.log('\nSome tests failed. Please check the errors above.');
} 