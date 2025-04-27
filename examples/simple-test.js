/**
 * Simple integration test for steem-js-updated
 * Tests basic API functionality
 */

const steem = require('../lib/index');

// Setup API connection
steem.api.setOptions({
  apiEndpoint: 'https://api.steemit.com'
});

// Set timeout for async operations
const TIMEOUT = 10000;

// Test functions
async function testConnection() {
  console.log('\n--- Testing Connection ---');
  try {
    const props = await steem.api.getDynamicGlobalProperties();
    console.log('✅ Connection successful!');
    console.log(`Current block: ${props.head_block_number}`);
    console.log(`Chain ID: ${props.head_block_id}`);
    return true;
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    return false;
  }
}

async function testAccount() {
  console.log('\n--- Testing Account Lookup ---');
  try {
    const account = await steem.api.getAccount('steemitblog');
    console.log('✅ Account lookup successful!');
    console.log(`Name: ${account.name}`);
    console.log(`Created: ${account.created}`);
    console.log(`Post count: ${account.post_count}`);
    return true;
  } catch (error) {
    console.error('❌ Account lookup failed:', error.message);
    return false;
  }
}

async function testContent() {
  console.log('\n--- Testing Content Lookup ---');
  try {
    const content = await steem.api.getContent('steemitblog', 'join-team-steemit-at-steemfest-4');
    console.log('✅ Content lookup successful!');
    console.log(`Title: ${content.title}`);
    console.log(`Author: ${content.author}`);
    console.log(`Date: ${content.created}`);
    return true;
  } catch (error) {
    console.error('❌ Content lookup failed:', error.message);
    return false;
  }
}

async function testKeyGeneration() {
  console.log('\n--- Testing Key Generation ---');
  try {
    const keys = steem.auth.generateKeys('username', 'password', ['posting']);
    console.log('✅ Key generation successful!');
    console.log(`Public key: ${keys.posting.public.substr(0, 20)}...`);
    return true;
  } catch (error) {
    console.error('❌ Key generation failed:', error.message);
    return false;
  }
}

// Run tests with a timeout
async function runTests() {
  console.log('Starting integration tests for steem-js-updated...\n');
  
  let allPassed = true;
  
  // Create an array of test promises with timeouts
  const tests = [
    Promise.race([
      testConnection(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timed out')), TIMEOUT))
    ]),
    
    Promise.race([
      testAccount(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Account lookup timed out')), TIMEOUT))
    ]),
    
    Promise.race([
      testContent(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Content lookup timed out')), TIMEOUT))
    ]),
    
    Promise.race([
      testKeyGeneration(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Key generation timed out')), TIMEOUT))
    ])
  ];
  
  // Run all tests
  for (const test of tests) {
    try {
      const passed = await test;
      if (!passed) allPassed = false;
    } catch (error) {
      console.error('❌ Test failed:', error.message);
      allPassed = false;
    }
  }
  
  console.log('\n--- Test Summary ---');
  if (allPassed) {
    console.log('✅ All tests passed! The library is working correctly.');
  } else {
    console.log('❌ Some tests failed. Please check the output above.');
  }
}

// Run all tests
runTests().catch(error => {
  console.error('Error running tests:', error);
}); 