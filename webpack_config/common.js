const { resolve, join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');//自动创建html文件

const prodMode = process.env.NODE_ENV === 'production';
const root = resolve(__dirname, '../');
module.exports = {
    entry: {
        index: join(root, 'src/index.js'),
    },
    output: {
        path: join(root, 'dist'),
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/chunks/[name].[hash].js',
        publicPath: prodMode ? '/dist/' : '/', 
    },
    module: {
        rules: [
        {
            //这个是为了转换js
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },{
            test: /\.(css|less)$/,
            use: [prodMode ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'less-loader'],
        },
        {
            // 转换文件png|svg|jpg|gif
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
        }]
    },
    plugins: [
        //每次编译都会把dist下的文件清除，我们可以在合适的时候打开这行代码，例如我们打包的时候，开发过程中这段代码关闭比较好
        // new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            //使用一个模板
            title:'项目名称',
            template: 'src/index.html' 
        })
    ],
    resolve: {
        alias: {
          components: join(root, 'src/components'),
          views: join(root, 'src/views'),
          utils: join(root, 'src/utils'),
          https: join(root, 'src/https'),
          assets: join(root, 'src/assets'),
        },
      },
};