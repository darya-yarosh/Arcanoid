
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier/recommended";
import globals from "globals";

export default defineConfig([
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
    ],
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      semi: ["warn", "always"],
    },
  },
]);
