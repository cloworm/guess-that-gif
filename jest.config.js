module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
      importHelpers: true,
    }
  },
  "setupFiles": [
    "<rootDir>/jest-setup.ts",
  ]
};
