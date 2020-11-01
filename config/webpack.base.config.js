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
          // 开启babel缓存
          // 第二次构建时，会读取之前的缓存
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