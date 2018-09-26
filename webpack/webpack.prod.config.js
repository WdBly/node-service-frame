var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname, '../');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

var PROD_GLOBAL_CONFIG = require('../client/common/config/server.env.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        index: path.resolve(ROOT_PATH, 'client/app.jsx'),
        vendor: ['react-router-dom', 'react', 'react-dom','react-redux']
    },
    output: {
        path: BUILD_PATH
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: 'css-loader'
                })
            }
        ]
    },
    plugins: [

        //淘汰掉了
        // new config.optimization.splitChunks({
        //     name: 'vendor',
        //     filename: '[name].bundle.js'
        // }), // 提取不变的js库单独生成js便于缓存

        
        // new webpack.optimize.UglifyJsPlugin({ // 压缩js
        //     compress: {
        //         warnings: false
        //     },
        //     output: {
        //         comments: false // remove all comments
        //     }
        // }),
        new webpack.DefinePlugin(PROD_GLOBAL_CONFIG),
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
