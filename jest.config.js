module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts?$': 'ts-jest'
    },
    testTimeout: 30000,
    coverageReporters: ["json-summary"]
  };
  