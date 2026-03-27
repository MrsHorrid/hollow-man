/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleNameMapper: {
    '^../../../shared/(.*)$': '<rootDir>/../shared/$1',
    '^../../shared/(.*)$': '<rootDir>/../shared/$1',
    '^../shared/(.*)$': '<rootDir>/../shared/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: {
        strict: false,
        esModuleInterop: true,
        resolveJsonModule: true,
      },
    },
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/server.ts',
    '!src/**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
};
