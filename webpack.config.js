let path = require('path');
// 打包前清空目录插件
let CleanWebpackPlugin = require('clean-webpack-plugin');
// html插件
let HtmlWebpackPlugin = require('html-webpack-plugin');
// CSS 插件
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// css 压缩插件
let OptimizationCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  //入口文件
  entry: {
    index: './src/index.js',
    login: './src/login.js'
  },
  //输出文件
  output: {
    filename: 'js/[name].js', //加个‘js’可使 .js 文件都打包到 js 文件夹内
    path: path.resolve('dist')
  },
  //模块处理
  module: {
    rules:[
      { 
        test: /\.css$/, 
        //以 link 的方式引入就无需 style-loader 了
        use: ExtractTextWebpackPlugin.extract({
          use: ['css-loader','postcss-loader'],
          publicPath: '../' //在 CSS 中指定 publicPath 路径，这样打包之后 css 可以根据相对路径引用图片资源
        })
        //以 style 方式注入页面,无需 ExtractTextWebpackPlugin.extract()
        // use: ['style-loader','css-loader']
       
      },
      {
        test: /\.(jpe?g|ping|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192, //小于此值将图片转为 base64 格式，不会存在实体图片
            outputPath: 'images/' //图片打包后存放的目录
          }
        }]
      },
      {
        test: /\.html$/,
        use: 'html-withimg-loader' //处理 img 中的图片链接地址
      },
      {
        test: /\.(eot|ttf|woff|svg)$/, //引用字体图片和svg图片,即使样式中引入这类格式的图标或者图片都没问题，img如果也引用svg格式的话，配合上面写好的html-withimg-loader就行了
        use: 'file-loader'
      }
    ]
  },
  //插件
  plugins: [
    // 打包前清空 dist 目录
    new CleanWebpackPlugin('dist'),
    //使用插件
    new HtmlWebpackPlugin({
      //引入html
      template: './src/index.html',
      filename: 'index.html',
      hash: true,
      chunks: ['index'] 
    }),
    
     new HtmlWebpackPlugin({
       //引入html
       template: './src/login.html',
       filename: 'login.html',
       hash: true,
       chunks: ['login']
     }),
    // 用 link 方式引入 CSS 
    new ExtractTextWebpackPlugin('css/style.css'),
    // 压缩 CSS
    new OptimizationCssAssetsWebpackPlugin()
  ],
  optimization:{
    // minimizer: [new OptimizationCssAssetsWebpackPlugin()]
  },
  //服务器配置
  devServer: {},
  //模式配置
  // mode: 'development'
  mode: 'production'
};