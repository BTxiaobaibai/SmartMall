// vue.config.js

// 引入 Node.js 的加密模块，用于解决本地开发时的 SSL 兼容性问题
const crypto = require('crypto')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  /**
   * 部署到 GitHub Pages 的核心配置。
   * process.env.NODE_ENV 是一个环境变量，
   * 在 `npm run serve` (本地开发) 时，它的值是 'development'。
   * 在 `npm run build` (打包) 时，它的值是 'production'。
   *
   * 这样配置可以确保：
   * 1. 本地开发时，路径是根目录 ('/')，能正常访问。
   * 2. 打包用于 GitHub Pages 时，路径是 '/smart-mall/'，能正确找到资源。
   *
   * !! 请确保 '/smart-mall/' 和你的 GitHub 仓库名完全一致 !!
   */
  publicPath: process.env.NODE_ENV === 'production'
    ? '/smart-mall/'
    : '/',

  // 打包后输出的文件夹名，设置为 'docs' 以便 GitHub Pages 直接部署
  outputDir: 'docs',

  // 保持您原有的其他配置
  transpileDependencies: true,
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '智慧商城'
        return args
      })
  },

  // 保持您本地开发时解决图片问题的代理配置
  devServer: {
    proxy: {
      '/suning_proxy': {
        target: 'https://uimgproxy.suning.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/suning_proxy': ''
        },
        secure: false,
        // 使用 crypto 模块的常量来解决 ECONNRESET 错误，并避免弃用警告
        secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT
      }
    }
  }
})
