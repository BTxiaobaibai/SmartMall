const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        // 在这里修改标题
        args[0].title = '智慧商城' // 或者您想要的任何名字
        return args
      })
  },
  // 配置本地代理
  // devServer 选项只在 npm run serve 时生效
  devServer: {
    proxy: {
      // 定义一个“暗号”，告诉 devServer 什么样的请求需要它来代理
      // 这个暗号可以随便起，但要清晰，比如 '/suning_proxy'
      '/suning_proxy': {
        // 当 devServer 看到 /suning_proxy 开头的请求时，
        // 它会把请求转发到下面的 target 地址
        target: 'https://uimgproxy.suning.cn',

        // 必须设置，告诉目标服务器我们不是在捣乱
        changeOrigin: true,

        // 路径重写：在转发请求前，把“暗号”本身去掉
        // 比如请求 /suning_proxy/a.jpg，转发时会变成 /a.jpg
        pathRewrite: {
          '^/suning_proxy': ''
        }
      }
    }
  }
})
