// jest.config.mjs
import nextJest from "next/jest.js";
const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};

export default createJestConfig(customJestConfig);
