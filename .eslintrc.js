module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    rules: {
        indent: ['error', 4],
        semi: ['error', 'never'],
        'import/no-extraneous-dependencies': 0,
        'import/no-unresolved': 0,
        'import/prefer-default-export': 0,
        'import/extensions': 0,
        'react/no-unescaped-entities': 0,
        'react/jsx-filename-extension': [1, {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }],
        'react/jsx-props-no-spreading': 0,
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
        ],
    },
}
