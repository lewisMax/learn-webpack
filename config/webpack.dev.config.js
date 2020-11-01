const { join } = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

const commonCssLoader = [
  'style-loader',
  'css-loader',
  'postcss-loader'
]

const devConfig = {
  entry: [join(__dirname, '../src/main.js'), join(__dirname, '../src/index.html')],
  output: {
    filename: 'js/[name].[hash:10].bundle.js',
    path: join(__dirname, '../dist'),
    publicPath: ''
  },
  devServer: {
    hot: true,
    port: '8080', //默认是8080
    quiet: false, //默认不启用
    inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
    stats: 'errors-only', //终端仅打印 error
    overlay: false, //默认不启用
    clientLogLevel: 'silent', //日志等级
    compress: true //是否启用 gzip 压缩
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCssLoader],
        exclude: /node_modules/
      },
      {
        test: /\.s(c|a)ss$/,
        use: [...commonCssLoader, 'sass-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin() //热更新插件
  ],
  mode: 'development',
  devtool: 'eval-source-map'
}

module.exports = merge(baseWebpackConfig, devConfig)