<template>
  <div class="cart">
    <van-nav-bar  title="购物车" fixed/>
    <div v-if="$store.getters.token && goodsTotal === 0" class="empty-cart">
      <img src="@/assets/empty.png" alt="">
      <div class="tips">
        您的购物车是空的, 快去逛逛吧
      </div>
  <div class="btn" @click="$router.push('/')">去逛逛</div>
    </div>
    <div v-else>
      <div class="cart-goods-list">
        <div class="cart-header" @click="editFn">
          <span>共<span class="cart-goods-total">{{goodsTotal || 0}}</span>件商品</span>
          <span><van-icon name="edit"/>编辑</span>
        </div>
        <div class="ItemComp" v-for="item in cartList" :key="item.goods_id">
          <van-checkbox :value="item.is_checked" @click="oneSelected(item.goods_id)"></van-checkbox>
          <div class="cart-list">
            <div class="left">
              <img :src="item.goods.goods_image" alt="">
            </div>
            <div class="right">
              <div class="rig-top text-ellipsis-2">{{item.goods.goods_name}}</div>
              <div class="rig-bottom">
                <span class="price">￥{{item.goods.goods_price_min}}</span>
                <CountBox :value="item.goods_num" @input="(value) => changeCunt(item.goods_id,value, item.goods_sku_id)"></CountBox>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <van-checkbox :value="selectAll" @click="ischeckedAll(!selectAll)">全选</van-checkbox>
        <div class="foot-right">
          <span v-if="!edit">合计：￥</span>
          <span class="total-price" v-if="!edit">{{goodsCheckedTotalPrice}}</span>
          <button v-if="!edit" @click="settleCart">结算<span>({{goodsCheckedTotal}})</span></button>
          <button v-else @click="delCart">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'
import { mapState, mapMutations, mapGetters } from 'vuex'
import { changeGoodsCount } from '@/api/cart'
import loginConfirm from '@/mixins/loginConfirm'
export default {
  name: 'MyCart',
  mixins: [loginConfirm],
  data () {
    return {
      edit: false
    }
  },
  computed: {
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['goodsTotal', 'goodsChecked', 'goodsCheckedTotal', 'goodsCheckedTotalPrice', 'selectAll'])
  },
  methods: {
    ...mapMutations('cart', ['']),
    oneSelected (id) {
      this.$store.commit('cart/oneSelected', id)
    },
    ischeckedAll (value) {
      this.$store.commit('cart/ischeckedAll', value)
    },
    editFn () {
      this.edit = !this.edit
    },
    async changeCunt (goodsId, goodsNum, goodsSkuId) {
      // 同步vuex页面
      this.$store.commit('cart/updateCount', { goodsId, goodsNum })
      // 发请求同步到后台
      await changeGoodsCount(goodsId, goodsNum, goodsSkuId)
      // console.log(res)
    },
    async delCart () {
      if (this.goodsCheckedTotal === 0) return
      this.$dialog.confirm({
        title: '删除商品',
        message: '你确定要删除吗'
      })
        .then(() => {
          this.$store.dispatch('cart/delCart')
          this.edit = false
        })
        .catch(() => {
          // on cancel
        })
    },
    async settleCart () {
      // this.$router.push('/pay')
      // console.log(this.goodsChecked)
      // if (!this.loginConfirm()) {
      //   return
      // }
      const shouldTerminate = await this.loginConfirm()
      if (shouldTerminate) {
        return
      }
      const cartId = this.goodsChecked.map(item => item.id).join(',')
      // console.log(cartId)
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'cart',
          cartId
        }
      })
    }
  },
  created () {
    this.$store.dispatch('cart/getCartList')
  },
  watch: {
    edit (value) {
      if (value) {
        // 编辑模式，修改复选框
        this.$store.commit('cart/ischeckedAll', false)
      } else {
        this.$store.commit('cart/ischeckedAll', true)
      }
    }
  },
  components: {
    CountBox
  }
}
</script>

<style lang="less" scoped>
.cart {
  padding: 100px 0;
  .cart-goods-list {
    background-color: #f5f5f5;
    padding-bottom: 5px;
    .cart-header {
      position: fixed;
      top: 45px;
      background-color: #f5f5f5;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 10px;
      .cart-goods-total {
        padding: 0 5px;
        color: #f93f41;
      }
    }
    .ItemComp {
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      margin: 0 10px 10px 10px;
      border-radius: 5px;
      .van-checkbox {
        padding: 0 10px;
      }
      .cart-list {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .left {
          width: 100px;
          img {
            width: 100%;
          }
        }
        .right {
          flex:1;
          padding: 20px 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .rig-top {
            font-size: 16px;
            margin-bottom: 10px;
          }
          .rig-bottom {
            display: flex;
            justify-content: space-between;
            .price {
              color: #fa3909;
              font-size: 16px;
            }
          }
        }
      }
    }
  }
  .footer {
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 50px;
    background-color: #fff;
    .foot-right {
      .total-price {
        color: #fa4c3d;
        font-size: 20px;
        padding-right: 10px;
      }
      button {
        border: none;
        background-color: #fa2f21;
        border-radius: 99px;
        color: #fff;
        padding: 10px 25px;
        &:active {
          background-color: darken(#fa3909, 10%);
        }
      }
    }
  }
}
.empty-cart {
  padding: 80px 30px;
  img {
    width: 140px;
    height: 92px;
    display: block;
    margin: 0 auto;
  }
  .tips {
    text-align: center;
    color: #666;
    margin: 30px;
  }
  .btn {
    width: 110px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #fa2c20;
    border-radius: 16px;
    color: #fff;
    display: block;
    margin: 0 auto;
  }
}
</style>
