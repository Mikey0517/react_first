const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

let config = {
  entry : path.join(__dirname,'./main.js'),
  output : {
    filename : '[name].[hash].js',
    path : path.join(__dirname,'./dist'),
  },
  module : {
    rules : [
      {
        test: /.jsx$/, //使用loader的目标文件。这里是.jsx
        loader: 'babel-loader'
      },
      {
        test: /.(js)$/, //使用loader的目标文件。这里是.js
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, './node_modules')  // 由于node_modules都是编译过的文件，这里我们不让babel去处理其下面的js文件
        ]
      }
    ]
  },
  plugins : [
    //生成html页面，打包时将所生成的entry放入其中
    new HTMLPlugin({
      template: path.join(__dirname, './index.html')
    })
  ]
}

if(isDev){
  config.devServer = {
    host : '0.0.0.0',
    port : 7777,
    contentBase : path.join(__dirname,'./dist'),
    hot : true,
    overlay : {
      error : true
    },
    // // 和output配置对应起来
    // publicPath: '/public',  // 访问所有静态路径都要前面加/public才能访问生成的静态文件
    // historyApiFallback: {
    //   index: '/public/index.html' // 所有404的请求全部访问该配置下的url
    // }
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}

module.exports = config;