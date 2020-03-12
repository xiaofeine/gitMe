const merge = require('webpack-merge')
const common = require('./common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')  //清除多余文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'nosources-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
      chunkFilename: "css/chunks/[name].[hash].css"
    }),
  ]
})