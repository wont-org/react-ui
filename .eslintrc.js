module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: ['plugin:react/recommended', 'airbnb', 'plugin:jest/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'no-param-reassign': ['error', { props: false }],
        'jsx-a11y/no-static-element-interactions': [
            'error',
            {
                handlers: [],
            },
        ],
        'react/static-property-placement': [
            'error',
            'property assignment',
            {
                // childContextTypes: 'static public field',
                // contextTypes: 'static public field',
                // contextType: 'static public field',
                // displayName: 'static public field',
                propTypes: 'static public field',
                defaultProps: 'static public field',
            },
        ],
        indent: ['error', 4],
        semi: ['error', 'never'],
        'no-multiple-empty-lines': [
            'error',
            {
                max: 2,
                maxBOF: 1,
            },
        ],
        'import/no-extraneous-dependencies': 0,
        'import/no-unresolved': 0,
        'import/prefer-default-export': 0,
        'import/extensions': 0,
        'react/no-unescaped-entities': 0,
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-filename-extension': [
            1,
            {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        ],
        'react/jsx-props-no-spreading': 0,
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        'prefer-const': [
            'error',
            {
                destructuring: 'all',
                ignoreReadBeforeAssign: false,
            },
        ],
    },
}
