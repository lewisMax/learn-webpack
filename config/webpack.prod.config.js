const { join } = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

/**
 * 缓存：
 *  - babel缓存：让第二次打包构建速度更快
 *    - cacheDirectory: true
 *  - 文件资源缓存
 *    - hash：每次webpack构建时，会生成一个唯一的hash值。因为js和css同时使用一个hash值，当我们只改动一个文件时，如果重新打包，会导致所有缓存失效。
 *    - chunkhash：很具chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就相同。同一个入口引入的资源同属于一个chunk。
 *    - contenthash：根据文件的内容生成的hash值。不同文件hash值一定不相同。
 *      - 让代码上线运行缓存更好使用
 */
const commonCssLoader = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../'
    }
  },
  'css-loader',
  'postcss-loader'
]

const prodConfig = {
  entry: join(__dirname, '../src/main.js'),
  output: {
    filename: 'js/[name].[contenthash:10].bundle.js',
    path: join(__dirname, '../dist'),
    publicPath: ''
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
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/index.[contenthash:10].bundle.css'
    })
  ],
  mode: 'production',
  devtool: 'nosources-source-map'
}

module.exports = merge(baseWebpackConfig, prodConfig)