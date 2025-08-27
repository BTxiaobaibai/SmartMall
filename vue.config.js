const { defineConfig } = require('@vue/cli-service')

// 引入 Node.js 的加密模块，我们需要用到它的一个特殊常量
const constants = require('constants')

module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '智慧商城'
        return args
      })
  },

  devServer: {
    proxy: {
      '/suning_proxy': {
        target: 'https://uimgproxy.suning.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/suning_proxy': ''
        },
        secure: false, // 保持不验证证书

        // ******** START: 这是解决 ECONNRESET 问题的终极武器 ********
        // 这行代码强制 Node.js 使用一种能够兼容老旧服务器的 SSL/TLS 连接方式
        secureOptions: constants.SSL_OP_LEGACY_SERVER_CONNECT
        // ******** END: 终极武器 ********
      }
    }
  }
})
