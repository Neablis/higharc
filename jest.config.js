module.exports = {
  clearMocks: true,
  maxWorkers: 1,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/__tests__/**/*.ts',
  ],
  transform: { '\\.(js|ts)$': 'babel-jest' }
};
  