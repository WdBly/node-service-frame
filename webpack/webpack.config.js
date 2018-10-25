 //4.0必须安装 webpack-cli

var webpack = require('webpack');
var path = require('path');
var webpackMerge = require('webpack-merge');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname, '../');
var CLIENT_PATH = path.resolve(ROOT_PATH, 'client');
var NODE_MODULES_PATH = path.resolve(ROOT_PATH, 'node_modules');
var additionalConfigPath = {
    development: './webpack.dev.config.js',
    production: './webpack.prod.config.js'
};
var baseConfig = {
    output: {
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].[chunkHash:6].bundle.js'
    },
    resolve: {
        modules: [NODE_MODULES_PATH],
        extensions: ['.js','.jsx','.webpack.js', '.web.js', '.less', '.json']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                  'presets': ['env', 'stage-0', 'react'],
                  'env': {
                    'development': {
                      'presets': ['react-hmre']
                    }
                  }
                },
                include: path.resolve(ROOT_PATH, 'client'),
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                  'presets': ['env', 'stage-0']
                },
                include: path.resolve(ROOT_PATH, 'client'),
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: path.resolve(CLIENT_PATH, 'common/img'), to: 'img'}
        ])
    ]
};

module.exports = webpackMerge(
    baseConfig,
    require(additionalConfigPath[process.env.NODE_ENV])
);