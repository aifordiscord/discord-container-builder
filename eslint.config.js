// ESLint v9+ configuration
export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      '*.config.js',
      '*.config.mjs',
      'scripts/**',
      'examples/**'
    ]
  },
  {
    files: ['src/**/*.ts', 'tests/**/*.ts'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        node: true,
        jest: true
      }
    },
    rules: {
      // Basic JavaScript rules
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'no-unused-vars': 'off', // Disabled in favor of TypeScript rule
      'no-undef': 'off', // TypeScript handles this
    }
  }
];