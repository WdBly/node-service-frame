var webpack = require('webpack');
var path = require('path');
var fs = require("fs");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname, '../');
var CLIENT_PATH = path.resolve(ROOT_PATH, 'client');
var DEV_PATH = path.resolve(ROOT_PATH, 'dev');

var DEV_GLOBAL_CONFIG = require('../client/common/config/dev.env.js');

module.exports = {
    context: path.resolve(__dirname, ".."),
    mode: "development",
    entry:{
        index:[
            "eventsource-polyfill",
            "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000",
            path.resolve(CLIENT_PATH, 'app.jsx')
        ],
        vendor: ['react-router-dom', 'react', 'react-dom']
    },
    output: {
        path: DEV_PATH
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                })
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
        new ExtractTextPlugin('[name].bundle.css')
    ]
};