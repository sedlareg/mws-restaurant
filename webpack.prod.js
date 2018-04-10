const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const sourceFolder =  path.resolve(__dirname, 'src');
const buildFolder = path.resolve(__dirname, 'dist');

const cleanWebpackPlugin = new CleanWebpackPlugin(
    ['dist'],
    {watch: false, verbose: true}
);

const copyWebpackPlugin = new CopyWebpackPlugin(
    [
        {
            from: path.join(sourceFolder, 'data'),
            to: path.join(buildFolder, 'data')
        }
    ],
    { debug: 'info' }
);

module.exports = merge(
    baseConfig,
    {
        output: {
            path: buildFolder,
            filename: '[name].js'
        },
        plugins: [
            cleanWebpackPlugin,
            copyWebpackPlugin
        ]
    }
);
