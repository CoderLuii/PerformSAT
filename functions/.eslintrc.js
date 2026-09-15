module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    "/generated/**/*", // Ignore generated files.
    "/node_modules/**/*", // Ignore dependencies (also ESLint's default).
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  overrides: [
    {
      // The node:test suites are plain CommonJS scripts run straight off
      // disk (no build step), so `require()` is correct there rather than a
      // TypeScript import.
      files: ["test/**/*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
  rules: {
    "quotes": ["error", "double"],
    "import/no-unresolved": 0,
    "indent": ["error", 2],
    // eslint-config-google caps lines at 80, which is unworkable for typed
    // Firebase handlers (generics plus awaited calls blow past it in a single
    // expression). 120 is the house limit and it stays enforced, not off.
    // Strings, template literals, comments, URLs and regexes are exempt
    // because wrapping those either changes the value or hurts readability.
    "max-len": ["error", {
      code: 120,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreComments: true,
      ignoreUrls: true,
      ignoreRegExpLiterals: true,
    }],
    // TypeScript signatures already carry the param/return contract, so
    // mandatory JSDoc on every function is pure ceremony.
    "require-jsdoc": "off",
    // Deprecated in ESLint 8 and redundant once types are the source of
    // truth: it flags @param/@return tags TypeScript already checks.
    "valid-jsdoc": "off",
    // A leading underscore is the house marker for "bound on purpose, never
    // read" — chiefly `const {x: _x, ...rest} = obj` to strip a key. Keep the
    // rule on for everything else.
    "@typescript-eslint/no-unused-vars": ["warn", {
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_",
      caughtErrorsIgnorePattern: "^_",
    }],
  },
};
