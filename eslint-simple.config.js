// Simple ESLint configuration without TypeScript parser issues
export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**', 
      'coverage/**',
      '*.config.js',
      '*.config.mjs',
      'scripts/**',
      'examples/**',
      'tests/**'
    ]
  },
  {
    files: ['src/**/*.ts'],
    rules: {
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unused-vars': 'off'
    }
  }
];