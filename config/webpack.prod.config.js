const { join } = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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

module.exports = {
  entry: join(__dirname, '../src/main.js'),
  output: {
    filename: 'js/[name].[contenthash:10].bundle.js',
    path: join(__dirname, '../dist'),
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          // babel-loader 支持缓存转换出的结果
          // 使用 cacheDirectory 选项将 babel-loader 的速度提高2倍
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        use: [...commonCssLoader],
        exclude: /node_modules/
      },
      {
        test: /\.s(c|a)ss$/,
        use: [...commonCssLoader, 'sass-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpe?g|gif|webp)$/i,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          esModule: false,
          name: '[name].[hash:10].[ext]',
          outputPath: 'imgs'
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:10].[ext]',
          outputPath: 'fonts'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: join(__dirname, '../src/index.html'),
      filename: 'index.html',
      minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/index.[contenthash:10].bundle.css'
    })
  ],
  mode: 'production',
  devtool: 'nosources-source-map'
}