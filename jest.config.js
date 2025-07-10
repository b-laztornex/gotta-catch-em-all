// jest.config.js
const nextJest = require("next/jest");
const createJestConfig = nextJest({ dir: "./" });

/** @type {import('ts-jest').JestConfigWithTsJest} */
const customConfig = {
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/__tests__/**/*.{spec,test}.{ts,tsx}"],
};

module.exports = createJestConfig(customConfig);
