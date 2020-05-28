//webpack.config.js

const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //清除生成文件插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); //html插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //拆分 css 插件 以 link 方式引入 css, 但只能合并单个 css

module.exports = {
    //开发模式
    // mode: 'production',
    mode: 'development', 
    //入口文件
    entry: {
        main: path.resolve(__dirname,'../src/main.js'),
        header: ['@babel/polyfill',path.resolve(__dirname,'../src/header.js')]
    }, 
    //输入文件
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname,'../dist')
    },
    //模块处理
    module: {
        rules:[
            //处理css文件
            {
                test: /\.css$/,
                use: [
                     MiniCssExtractPlugin.loader, 
                    // 'style-loader', //使用mini-css-extract-plugin时,注释 style-loader.
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugin:[require('autoprefixer')]
                        } 
                        //postcss-loader autoprefixer 为 css 添加浏览器前缀
                    }
                ]  
                //从右向左解析原则,以 style 标签方式注入 css
            },
            //处理less文件
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']
            },
            //处理 js, babel转义
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /node_modules/
            },
            //处理图片文件
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }]
            },
            //处理媒体文件
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'media/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }]
            },
            //处理字体
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }]
            }
        ]
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
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css',
            chunkFilename: '[id].css'
        })
    ]
};