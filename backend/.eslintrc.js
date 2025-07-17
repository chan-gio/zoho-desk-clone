module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: ['./tsconfig.json'],
    },
    plugins: ['@typescript-eslint', 'import', 'prettier', 'jsdoc'],
    extends: [
      'airbnb-base',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
      'plugin:jsdoc/recommended',
      'plugin:prettier/recommended',
    ],
    env: {
      node: true,
      browser: true,
      es2022: true,
    },
    settings: {
      'import/resolver': {
        typescript: {}, // for alias resolution
      },
    },
    rules: {
      'prettier/prettier': ['error'],
      'import/prefer-default-export': 'off',
      'no-console': 'warn',
      'class-methods-use-this': 'off',
      'jsdoc/require-jsdoc': [
        'warn',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
          },
        },
      ],
    },
  };
  