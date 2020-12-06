module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  "ignorePatterns": ["**/migration/**/*.ts"],
  "rules": {
    "consistent-return": 0,
    "global-require": 0,
    "import/imports-first": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 0,
    "indent": [2, 2, {"SwitchCase": 1}],
    "max-len": [2, 250],
    "no-console": 0,
    "no-param-reassign": ["error", { "props": true }],
    "no-return-assign": 0,
    "no-underscore-dangle": 0,
    "no-unused-expressions": 0,
    "no-useless-escape": 0,
    "object-shorthand": 0,
    "prefer-rest-params": 0,
    "react/require-extension": 0,
    "spaced-comment": 0,
    "strict": 0,
    "no-else-return": 0
  }
};