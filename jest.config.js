module.exports = {
  clearMocks: true,
  maxWorkers: 1,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.test.js',
    '!lib/',

  ],
  transform: { '\\.(js|ts)$': 'babel-jest' }
};
  