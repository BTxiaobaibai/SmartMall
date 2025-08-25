import { getInfo, setInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      userInfo: getInfo()
    }
  },
  mutations: {
    setuserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  getters: {},
  actions: {
    logout (context) {
      context.commit('setuserInfo', {})
      context.commit('cart/updateCart', [], { root: true })
    }
  }
}
