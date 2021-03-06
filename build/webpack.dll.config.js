const path = require('path');
const webpack = require('webpack');
module.exports = {
    // 抽取的第三方
    entry: {
        vendor: ['@babel/polyfill']
    },
    output: {
        path: path.resolve(__dirname,'static/js'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname,'[name]-manifest.json'),
            name: '[name]_library',
            context: __dirname
        })
    ]
}