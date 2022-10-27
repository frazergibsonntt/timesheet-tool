/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  preset: 'ts-jest',
  clearMocks: true,
  resetMocks: false,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testTimeout: 50_000,
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],
  testPathIgnorePatterns: [
    "/dist/"
  ],
  coverageProvider: "v8",
  moduleFileExtensions: [
    "js",
    "ts"
  ],
  globalSetup: "./setup.js",
  reporters: ["default", ["jest-junit", {
    outputDirectory: 'reports'
  }]]
};
