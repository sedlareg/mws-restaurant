const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');

module.exports = merge(
    baseConfig,
    {
        watch: false,
        devServer: {
            // inline: true,
            contentBase: 'src',
            port: 8887,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
            }
        },
    }
);
