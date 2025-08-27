智慧商城 (Smart Mall) - Vue 2 移动端项目



    https://img.shields.io/badge/Vue.js-2.x-brightgreen.svg



这是一个基于 Vue 2 全家桶技术栈开发的、功能完备的移动端电商项目。项目实现了从用户登录到商品浏览、购物车、下单支付的完整业务闭环。

在线演示地址: https://smart-mall-le84s36si-xiaobaibais-projects-497e88ee.vercel.app

✨ 项目特色 (Features)

- 用户模块: 实现用户登录、注册、个人信息展示及退出功能。
- 商品系统: 包括商品分类、商品列表、商品搜索及商品详情展示。
- 购物车: 支持商品添加、数量增减、商品选中、删除及总价计算。
- 订单流程: 完整的下单结算、支付流程及订单历史管理。
- 组件化架构: 项目采用组件化思想，将页面拆分为可复用的业务组件。
- 状态管理: 使用 Vuex 对用户登录状态、购物车数据等全局状态进行统一管理。
- 路由权限控制: 通过 Vue Router 的导航守卫和 Mixins 实现登录权限的校验。

📸 项目截图 (Screenshots)

  首页                       	分类页                      	购物车                      	我的                       
  <img src="" width="250"/>	<img src="" width="250"/>	<img src="" width="250"/>	<img src="" width="250"/>

如何添加截图：

1. 在项目根目录下创建一个文件夹，例如 docs/images。
2. 将您的项目截图（如 home.png, cart.png）放入该文件夹。
3. 修改上面表格中的 src 路径，例如：src="./docs/images/home.png"。

🛠️ 技术栈 (Technology Stack)

- 主框架: Vue 2
- 路由管理: Vue Router
- 状态管理: Vuex (使用 modules 进行模块化管理)
- HTTP 请求: Axios (在 src/utils/request.js 中进行封装)
- UI 组件库: Vant UI (按需加载配置于 src/utils/vant-ui.js)
- CSS 预处理器: Less (全局样式及变量定义于 src/styles)
- 代码规范: ESLint
- 部署平台: Vercel

📁 项目结构解析

    ├── dist/                  # 打包输出目录
    ├── public/                # 公共静态资源
    ├── src/                   # 核心代码目录
    │   ├── api/               # API 接口定义
    │   ├── assets/            # 静态资源 (图片等)
    │   ├── components/        # 全局公共组件
    │   ├── mixins/            # 混入 (如登录校验)
    │   ├── router/            # 路由配置
    │   ├── store/             # Vuex 状态管理
    │   │   ├── index.js       # Vuex 入口
    │   │   └── modules/       # 模块化 store
    │   ├── styles/            # 全局样式
    │   ├── utils/             # 工具函数 (axios封装, Vant配置等)
    │   └── views/             # 页面级组件
    ├── .eslintrc.js           # ESLint 配置文件
    ├── babel.config.js        # Babel 配置文件
    └── vue.config.js          # Vue CLI 配置文件

🚀 启动项目 (Getting Started)

1. 克隆仓库
       git clone https://github.com/BTxiaobaibai/SmartMall.git
2. 进入项目目录
       cd SmartMall
3. 安装依赖
       npm install
   如果遇到 ERESOLVE 依赖冲突问题，请尝试使用：
       npm install --legacy-peer-deps
4. 启动本地开发环境
       npm run serve
5. 打包用于生产环境
       npm run build

📝 总结与收获

通过该项目，我深入实践了 Vue 2 全家桶在真实业务场景下的应用。不仅熟练掌握了组件化开发、Vuex 模块化管理等核心技能，还独立解决了项目部署过程中遇到的 Mixed Content (混合内容) 安全策略问题，对前端工程化及项目从开发到上线的完整生命周期有了深刻的理解。
