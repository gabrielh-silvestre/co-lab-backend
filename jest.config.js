const tsconfig = require('./tsconfig.json');
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig);

module.exports = {
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: { '^.+\\.(t|j)s$': 'ts-jest' },
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper,
  clearMocks: true,
};
