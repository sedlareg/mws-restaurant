const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');

module.exports = merge(
    baseConfig,
    {
        watch: false,
        devServer: {
            inline: true,
            contentBase: 'src',
            port: 8000
        },
    }
);