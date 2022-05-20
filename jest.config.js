const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  testTimeout: 30000,
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/providers/setupAfterEnv.test.ts"],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/entities/**/*.{js,ts}",
    "<rootDir>/src/repositories/**/*.{js,ts}",
    "<rootDir>/src/requirements/**/*.{js,ts}",
    "!<rootDir>/src/requirements/**/dto/*.{js,ts}",
    "<rootDir>/@static/**/*.{js,ts}",
  ],
  coverageDirectory: "src/__tests__/coverage",
  coverageProvider: "babel",
  coverageReporters: ["text-summary", "lcov"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>",
  }),
  modulePathIgnorePatterns: ["providers", "database"],
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/?(*.)(test|spec).[jt]s?(x)"]
};
