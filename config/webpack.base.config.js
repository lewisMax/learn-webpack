const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        // 开启多进程打包。进程开启时间大概为600ms，进程通信也有开销，有利有弊。
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              // babel-loader 支持缓存转换出的结果
              // 使用 cacheDirectory 选项将 babel-loader 的速度提高2倍
              cacheDirectory: true
            }
          }
        ],
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
    new HtmlWebpackPlugin({
      template: join(__dirname, '../src/index.html'),
      filename: 'index.html',
      minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true
      }
    })
  ],
  externals: {
    // 忽略库名: npm包名
    // https://webpack.docschina.org/configuration/externals/
  }
}