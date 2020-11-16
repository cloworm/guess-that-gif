module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
      importHelpers: true,
    }
  },
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    'components/**/*.{js,jsx}',
    'pages/**/*.{js,jsx}',
    '!**/node_modules/**',
  ],
};
