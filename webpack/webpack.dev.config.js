var webpack = require('webpack');
var path = require('path');
var fs = require("fs");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname, '../');
var CLIENT_PATH = path.resolve(ROOT_PATH, 'client');
var DEV_PATH = path.resolve(ROOT_PATH, '/dist');

var DEV_GLOBAL_CONFIG = require('../client/common/config/dev.env.js');

module.exports = {
    context: path.resolve(__dirname, ".."),
    mode: "development",
    entry:{
        index:[
            "eventsource-polyfill",
            "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true",
            path.resolve(CLIENT_PATH, 'app.jsx')
        ],
        vendor: ['react-router-dom', 'react', 'react-dom','react-redux']
    },
    output: {
        path: DEV_PATH
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ["css-hot-loader"].concat(ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                importLoaders: 1
                            }
                        }, {
                            loader: "postcss-loader"
                        },
                        "less-loader"
                    ]
                })),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin(DEV_GLOBAL_CONFIG),
        new webpack.HotModuleReplacementPlugin(), // 热替换
        new ExtractTextPlugin('[name].bundle.css'),
        new HtmlWebpackPlugin({
            favicon: path.resolve(ROOT_PATH, 'favicon.ico'),
            filename:"index.html",
            template: path.resolve(path.resolve(ROOT_PATH, 'server/template'), 'index.templete.html'), //source
            chunks: ['index', 'vendor'],
            hash: true
        })
    ]
};