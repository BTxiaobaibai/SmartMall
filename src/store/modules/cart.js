import { delCart, getCartList } from '@/api/cart'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    updateCart (state, data) {
      state.cartList = data || []
    },
    oneSelected (state, id) {
      const res = state.cartList.find(item => item.goods_id === id)
      res.is_checked = !res.is_checked
    },
    ischeckedAll (state, value) {
      state.cartList.forEach(item => { item.is_checked = value })
    },
    updateCount (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  getters: {
    goodsTotal (state) {
      return state.cartList?.reduce((sum, item) => sum + item.goods_num, 0)
    },
    goodsChecked (state) {
      // console.log(state.cartList.filter(item => item.is_checked === true))
      return state.cartList?.filter(item => item.is_checked === true)
    },
    goodsCheckedTotal (state, getters) {
      return getters.goodsChecked.reduce((sum, item) => sum + item.goods_num, 0)
    },
    goodsCheckedTotalPrice (state, getters) {
      return getters.goodsChecked.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0)
    },
    selectAll (state) {
      return state.cartList.every(item => item.is_checked)
    }
  },
  actions: {
    async getCartList (context) {
      const res = await getCartList()
      res.data.list.forEach(item => {
        item.is_checked = true
      })

      context.commit('updateCart', res.data.list)
      // console.log(res)
    },
    async delCart (context) {
      const seltList = context.getters.goodsChecked
      const ids = seltList.map(item => item.id)
      // console.log(ids)
      await delCart(ids)
      Toast('删除成功')
      // 重新拉取最新购物车数据
      context.dispatch('getCartList')
      // context.commit('ischeckedAll',
    }
  }

}
