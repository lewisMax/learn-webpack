const { join } = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

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
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  mode: 'production',
  devtool: 'nosources-source-map'
}

module.exports = merge(baseWebpackConfig, prodConfig)