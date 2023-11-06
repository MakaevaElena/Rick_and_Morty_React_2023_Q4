// eslint-disable-next-line no-undef
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // roots: ['src'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx)$',
  transform: {
    '^.+\\.tsx$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
  },
};
