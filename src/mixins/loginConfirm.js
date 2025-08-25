export default {
  methods: {
    // 是否需要弹登录确认框
    // (1) 需要，返回 true，并直接弹出登录确认框
    // (2) 不需要，返回 false
    loginConfirm () {
      if (!this.$store.getters.token) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '此时需要先登录才能继续操作哦',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            // 如果希望，跳转到登录 => 登录后能回跳回来，需要在跳转去携带参数 (当前的路径地址)
            // this.$route.fullPath (会包含查询参数)
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {})
        return true
      }
      return false
    }
  }
}

// // mixins/loginConfirm.js
// export default {
//   methods: {
//     // 将方法改为异步
//     async loginConfirm () {
//       if (!this.$store.getters.token) {
//         try {
//           // await 会在这里暂停，直到用户点击弹窗
//           await this.$dialog.confirm({
//             title: '请先登录',
//             message: '是否跳转到登录页面'
//           })
//           // 如果用户点击确认，代码会继续执行
//           this.$router.replace({
//             path: '/login',
//             query: {
//               backUrl: this.$route.fullPath
//             }
//           })
//           // 因为页面要跳转了，返回 true 终止业务逻辑
//           return true
//         } catch (err) {
//           // 如果用户点击取消，await 会抛出错误，进入这里
//           // 返回 true 终止业务逻辑
//           return true
//         }
//       }
//       // 如果用户有 token，返回 false，让业务逻辑继续执行
//       return false
//     }
//   }
// }
