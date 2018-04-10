/**
 * IMPORTS
 */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 *  PATHS
 */
const sourceFolder =  path.resolve(__dirname, 'src');
const PATHS = {
    overviewTemplate: path.join(sourceFolder, 'templates/index.html'),
    detailTemplate: path.join(sourceFolder, 'templates/restaurant.html'),
    mainEntry: path.join(sourceFolder, 'index.js'),
    detailsEntry: path.join(sourceFolder, 'restaurant.js'),
    swEntry: path.join(sourceFolder, 'sw.js'),
};

/**
 *  PLUGIN IMPLEMENTATION
 */
const overviewHtmlWebpackPlugin = new HtmlWebpackPlugin({
    hash: false,
    inject: false,
    title: 'Restaurant Reviews',
    template: PATHS.overviewTemplate,
    chunks: ['main'],
    filename: 'index.html',
    favicon: '',
});

const detailsHtmlWebpackPlugin = new HtmlWebpackPlugin({
    hash: false,
    inject: false,
    title: 'Restaurant Info',
    template: PATHS.detailTemplate,
    chunks: ['details'],
    filename: 'restaurant.html',
    favicon: '',
});

const extractSASS = new ExtractTextPlugin({
    filename: 'styles/main.css',
    allChunks: true
});

/**
 * RULES AND EXPORT
 */
const entries = {
    main: PATHS.mainEntry,
    details: PATHS.detailsEntry,
    sw: PATHS.swEntry
};

module.exports = {
    context: __dirname,
    entry: entries,
    resolve: {
        modules: [
            'node_modules',
            sourceFolder
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env'],
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: extractSASS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {url: false, minimize: true, sourceMap: true}
                        },
                        {
                            loader: 'sass-loader',
                            options: {sourceMap: true, minimize: true}
                        }
                    ]
                })
            },
        ]
    },
    plugins: [
        overviewHtmlWebpackPlugin,
        detailsHtmlWebpackPlugin,
        extractSASS,
    ]
};
