const path = require('path')

module.exports = {
    stories: [
        '../components/**/*.stories.mdx',
        '../components/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
    ],
    typescript: {
        check: false,
        checkOptions: {},
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) =>
                prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
        },
    },
    webpackFinal: async (config, {
        configType
    }) => {
        // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
        // You can change the configuration based on that.
        // 'PRODUCTION' is used when building the static version of storybook.

        // Make whatever fine-grained changes you need
        config.module.rules.push({
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader'],
            include: path.resolve(__dirname, '../components'),
        });
        return config;
    },
}
