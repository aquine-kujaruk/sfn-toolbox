import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  eslint.configs.recommended,
  prettier,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**', '.next/**'],
  },
];
