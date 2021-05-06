const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development', // 打包模式 development 开发模式  production 生产者模式
  entry: './src/index.js', // 定义打包文件的入口，也就是构建依赖图谱的根节点
  output: {
    path: path.resolve(__dirname, 'dist'), // 打包文件后的目录
    filename: 'bundle.js'// 打包后生成的文件
  },
  devServer: { // 开发服务器配置
    port: 3000,
    open: true,
    contentBase: './dist',
    progress: true,
    // 配置开发服务器
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  resolve: {
    modules: [path.resolve('node_modules')], // 解析第三发包
    mainFields: ['style', 'main'], // 解析package.json中的入口顺序
    mainFiles: [], // 入口文件的名称
    extensions: ['.js', '.css', '.json'], // 添加后缀名，依次解析
    alias: { // 别名
      '@src': './src',
      '@components': './components'
    }
  },
  plugins: [ // 放置所有的插件
    new HtmlWebpackPlugin({ // 将打包后的文件生成script标签，插入到html模板中
      template: './src/index.html', // 以那个文件为模板
      filename: 'index.html', // 生成的文件名
      minify: {
        removeAttributeQuotes: true, // 移除双引号
        collapseWhitespace: true // 文件为一行
      },
      hash: true
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/doc',
          to: './doc'
        }
      ]
    }),
    new webpack.BannerPlugin('make 2021 by zt') // 内置插件，为js文件声明版权
  ],
  module: {
    rules: [ // 存放多个loader loader特点功能单一
      {
        test: '/\.css$/',
        use: [ // 多个loader执行顺序是从后到前
          { // 将生成的css文件作用于html文件
            loader: 'style-loader',
            options: {}
          },
          'css-loader' // 将css文件处理成webpack识别
        ]
      }
    ]
  }
}