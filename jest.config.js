module.exports = {
  // Setup file
  setupFiles: ['./test/setup.js'],
  
  // Use Babel to transform test files
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  
  // Ignore node_modules except specific packages
  transformIgnorePatterns: [
    'node_modules/(?!(bs58|bytebuffer|browserify-aes)/)',
  ],
  
  // Test environment is node
  testEnvironment: 'node',
  
  // Test paths - include all files that might contain tests
  testMatch: [
    '**/test/**/*.test.js',
    '**/test/**/*.js',
    '!**/test/setup.js',
    '!**/test/browser/**'
  ],
  
  // Coverage ignore
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  
  // Don't fail on first error to see all test issues
  bail: false,
  
  // Set a longer timeout for tests that perform API calls
  testTimeout: 30000
}; 