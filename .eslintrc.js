module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020, // 最新のECMAScriptを使用
      sourceType: 'module', // モジュールを使用
    },
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'next/core-web-vitals', // Next.jsの推奨設定
    ],
    rules: {
      // 追加のルールをここに記述できます
    },
  };
  