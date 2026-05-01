export default {
  testEnvironment: 'node',
  rootDir: '.',
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  transform: {},
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!**/tests/**',
  ],
  maxWorkers: 1,
  testTimeout: 30000,
  verbose: true,
};