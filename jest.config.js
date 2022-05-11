/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["<rootDir>/src/config/setup-tests.ts"],

  testMatch: ["**/*.spec.ts"],
  coverageProvider: "v8",
  clearMocks: true,
  bail: true,
};
