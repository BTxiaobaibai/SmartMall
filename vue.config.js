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
  }
})
