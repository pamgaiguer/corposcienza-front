import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierPlugin from 'eslint-plugin-prettier'; //  IMPORTANTE

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.yml',
    ],
  },
  {
    plugins: {
      prettier: prettierPlugin, // Aqui o ESLint passa a reconhecer o "prettier/prettier"
    },
  },
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'react/prop-types': 0,
      quotes: ['error', 'single'],
      semi: ['error', 'always', { omitLastInOneLineBlock: true }],
      'no-console': 1,
      camelcase: ['warn'],
      eqeqeq: ['error', 'always'],
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  }),
];

export default eslintConfig;
