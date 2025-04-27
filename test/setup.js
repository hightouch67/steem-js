// Setup for test environment
// Explicitly define structuredClone if it doesn't exist to prevent conflicts
if (typeof globalThis.structuredClone !== 'function') {
  globalThis.structuredClone = function(obj) {
    return JSON.parse(JSON.stringify(obj));
  };
}

// Import a minimal set of polyfills
require('@babel/register')({
  // This will use babel config in the project
  ignore: [/node_modules/]
});

// Add Mocha globals for Jest compatibility
global.before = function(fn) {
  return global.beforeAll(fn);
};
global.after = function(fn) {
  return global.afterAll(fn);
};

// Mock describe to support Mocha's context binding
const originalDescribe = global.describe;
global.describe = function(name, fn) {
  if (fn.length === 0) {
    // Create a context object that mimics Mocha's this
    const context = {
      timeout: function(ms) {
        // Mocked timeout function for Mocha compatibility
        // Jest doesn't need this but tests expect it
        return this;
      }
    };
    
    return originalDescribe(name, function() {
      fn.call(context);
    });
  } else {
    return originalDescribe(name, fn);
  }
};

// Add Promise delay for tests
Promise.delay = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Mock browser crypto for Node environment
if (!global.crypto) {
  global.crypto = {
    getRandomValues: function(buffer) {
      return require('crypto').randomFillSync(buffer);
    }
  };
}

// For tests that use process.env
if (!process.env.STEEM_PASSWORD) {
  process.env.STEEM_PASSWORD = 'password';
}

// For test environment
process.env.NODE_ENV = 'test'; 