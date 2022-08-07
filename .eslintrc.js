module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: "tsconfig.json",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react-hooks/recommended",
    "prettier",
    "next/core-web-vitals",
  ],
  plugins: ["import", "@typescript-eslint", "prettier"],
  settings: {
    next: {
      rootDir: __dirname,
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    "prettier/prettier": ["error"],
  },
  ignorePatterns: ["**/*.js", "**/*.json", ".next", "public"],
};
