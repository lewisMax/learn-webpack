const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
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
    new HtmlWebpackPlugin({
      template: join(__dirname, '../src/index.html'),
      filename: 'index.html',
      minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true
      }
    })
  ]
}