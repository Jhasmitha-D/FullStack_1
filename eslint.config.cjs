module.exports = [
  // ignore node_modules by default
  { ignores: ['node_modules/**'] },

  // apply to JS/TS/JSX/TSX files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      // For plain JS, remove parser line. For TS, install @typescript-eslint/parser.
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      }
    },
        rules: {
      // add project rules here, example:
      // 'no-console': 'warn'
    }
  }
];