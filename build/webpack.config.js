//webpack.config.js

const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //开发模式
    // mode: 'production',
    mode: 'development', 
    //入口文件
    entry: {
        main: path.resolve(__dirname,'../src/main.js'),
        header: path.resolve(__dirname,'../src/header.js')
    }, 
    //输入文件
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname,'../dist')
    },
    // 插件
    plugins: [
        new CleanWebpackPlugin(), //重置生成文件
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'../public/index.html'),
            filename: 'index.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'../public/header.html'),
            filename: 'header.html',
            chunks: ['header'] //与入口文件相应的模块名
        })
    ]
};