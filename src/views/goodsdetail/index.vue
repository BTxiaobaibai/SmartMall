<template>
  <div class="goodslist-detail" v-if="detail.goods_name">
    <van-nav-bar title="商品详情" left-arrow @click-left="$router.go(-1)" fixed/>
    <van-swipe @change="onChange">
      <van-swipe-item v-for="item in images" :key="item.external_url">
        <img :src="item.external_url" alt="">
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/{{images.length}}</div>
      </template>
    </van-swipe>
    <div class="salse-data">
      <div class="price">
        <span class="new">￥{{detail.goods_price_min}}</span><span class="old">￥{{detail.line_price_max}}</span>
      </div>
      <div class="count">已售{{detail.goods_sales}}件</div>
    </div>
    <p class="title">{{detail.goods_name}}</p>
    <div class="sales-return">
      <div>
        <van-icon name="passed" color="#fa5d49"/><span>七天无理由退货</span>
        <van-icon name="passed" color="#fa5d49"/><span>48小时发货</span>
      </div>
      <van-icon name="arrow" />
    </div>
    <div class="comment">
      <div class="top">
        <div class="commleft">商品评价（{{commentsData.total}}条）</div>
        <div class="commright" @click="$router.push(`/comment/${$route.params.id}`)"><span>查看更多</span><van-icon name="arrow" color="#9ea1a6"/></div>
      </div>
      <div class="under">
        <div class="under-list" v-for="item in commentsList" :key="item.create_time">
          <div class="usermsg">
            <img :src="item.user.avatar_url" alt="">
            <span>{{item.user.nick_name}}</span>
            <van-rate :value="item.score/2" allow-half void-icon="star" void-color="#eee" color="#ffd21e" readonly />
          </div>
          <p class="commcontent ">{{item.content}}</p>
          <p class="time">{{item.create_time}}</p>
        </div>
      </div>
    </div>
    <div class="introduce-title">商品描述</div>

    <!-- ******** START: 核心修改点 1 ******** -->
    <!-- 不再直接使用 detail.content，而是使用我们新创建的计算属性 processedContent -->
    <div class="goods-introduce" v-html="processedContent"></div>
    <!-- ******** END: 核心修改点 1 ******** -->

    <van-goods-action>
      <van-goods-action-icon icon="wap-home-o" text="首页" @click="$router.push('/home')"/>
      <van-goods-action-icon icon="shopping-cart-o" text="购物车" :badge="cartTotal > 0 ? 'cartTotal' : ''" @click="$router.push('/cart')"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="addCart"/>
      <van-goods-action-button type="danger" text="立即购买" @click="buyNow"/>
    </van-goods-action>
    <van-action-sheet v-model="show" :title="clickData === 'cart' ? '加入购物车': '立即购买'">
      <div class="content">
        <div class="header">
          <div class="left">
            <img :src="detail.goods_image" alt="">
          </div>
          <div class="right">
            <p class="price">￥{{detail.goods_price_min}}</p>
            <p class="save-count">库存{{detail.stock_total}}</p>
          </div>
        </div>
        <div class="body">
          <span>数量</span>
          <span>
            <CountBox v-model="buyCount"></CountBox>
          </span>
        </div>
        <div class="btn-cart" v-if="detail.stock_total > 0 && clickData === 'cart'" @click="addCartFn">加入购物车</div>
        <div class="btn-buy" v-else-if="detail.stock_total > 0 && clickData === 'buyNow'" @click="buyFn">立即购买</div>
        <div class="btn-empty" v-else>商品已售罄</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { getCommentsData, getGoodsDetail } from '@/api/product'
import { getAddCart } from '@/api/cart'
import CountBox from '@/components/CountBox.vue'
import loginConfirm from '@/mixins/loginConfirm'
// import { settleAccount } from '@/api/settle'
export default {
  name: 'MyGoodsDetail',
  mixins: [loginConfirm],
  data () {
    return {
      current: 0,
      detail: '',
      commentsData: '',
      commentsList: '',
      show: false,
      clickData: 'cart',
      buyCount: 1,
      cartTotal: 0
    }
  },
  async created () {
    const res = await getGoodsDetail(this.$route.params.id)
    // console.log(res) // created 钩子只负责获取原始数据
    this.detail = res.data.detail
    const comments = await getCommentsData({ goodsId: this.$route.params.id, limit: 3 })
    this.commentsList = comments.data.list
    this.commentsData = comments.data
  },
  methods: {
    onChange (index) {
      this.current = index
    },
    addCart () {
      this.clickData = 'cart'
      this.show = true
    },
    buyNow () {
      this.clickData = 'buyNow'
      this.show = true
    },
    // 将方法改为异步，并用 await 等待 loginConfirm
    async addCartFn () {
      const shouldTerminate = await this.loginConfirm()
      if (shouldTerminate) {
        return
      }
      const { data } = await getAddCart({ goodsId: this.detail.goods_id, goodsNum: this.buyCount, goodsSkuId: this.detail.skuList[0].goods_sku_id })
      this.cartTotal = data.cartTotal
      this.show = false
      this.$toast('加入成功')
    },
    async buyFn () {
      const shouldTerminate = await this.loginConfirm()
      if (shouldTerminate) {
        return
      }
      // 这里可以放购买的业务逻辑
      // await settleAccount('buyNow',{})
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'buyNow',
          goodsId: this.goodsId,
          goodsSkuId: this.detail.skuList[0].goods_sku_id,
          goodsNum: this.buyCount
        }
      })
    }
  },
  computed: {
    images () {
      // 增加一个安全检查，防止 detail 不存在时报错
      return this.detail ? this.detail.goods_images : []
    },
    goodsId () {
      return this.$route.params.id
    },

    // ******** START: 核心修改点 2 ********
    // 添加一个新的计算属性，专门用来处理富文本内容中的图片路径
    processedContent () {
    // 1. 安全检查
      if (!this.detail.content) {
        return ''
      }

      // 2. 原始的、有问题的图片域名
      const originalDomain = 'https://uimgproxy.suning.cn'

      // 3. 我们使用的免费、公共图片代理服务前缀
      // 这里我们使用了 images.weserv.nl，它非常稳定可靠
      const proxyPrefix = 'https://images.weserv.nl/?url='

      // 4. 执行替换！
      // 这一次，我们把 "https://uimgproxy.suning.cn"
      // 替换为 "https://images.weserv.nl/?url=uimgproxy.suning.cn"
      // 注意：我们去掉了目标域名中的 https://
      const targetDomainWithoutProtocol = 'uimgproxy.suning.cn'
      return this.detail.content.replaceAll(originalDomain, proxyPrefix + targetDomainWithoutProtocol)
    }
    // ******** END: 核心修改点 2 ********
  },
  components: {
    CountBox
  }
}
</script>

<style lang="less" scoped>
.goodslist-detail {
  padding-top: 50px;
  padding-bottom: 50px;
  .van-swipe {
    .van-swipe-item {
      img {
        width: 100%;
      }
    }
  }
  .salse-data {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    .price {
      .new {
        color: #fa280f;
        font-size: 20px;
      }
      .old {
        color: #9ea1a6;
        text-decoration: line-through;
        font-size: 14px;
      }
    }
    .count {
      color: #9ea1a6;
    }
  }
  p {
    font-size: 16px;
    padding: 0 10px;
  }
  .sales-return {
    display: flex;
    justify-content: space-between;
    margin: 10px;
    padding: 10px;
    background-color: #fafafa;
    span {
      padding-right: 10px;
    }
  }
  .comment {
    padding: 0 10px;
    .top {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      .commright {
        span {
          color: #9ea1a6;
          padding-right: 5px;
        }
      }
    }
    .under {
      .under-list {
        padding: 10px 0;
        .usermsg {
          img {
            width: 16px;
          }
          span {
            padding-left: 10px;
            font-size: 16px;
          }
        }
        .commcontent {
          padding: 10px 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .time {
          padding: 0;
          color: #9ea1a6;
          font-size: 14px;
        }
      }
    }
  }
  .introduce-title {
    text-align: center;
  }
}
.custom-indicator {
  position: absolute;
  border-radius: 99px;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(225, 225, 225,0.5);
}
.content {
  padding: 16px 16px 16px;
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    justify-content: start;
    padding: 10px 0;
    .left {
      img {
        height: 90px;
        width: auto;
      }
    }
    .right {
      flex:1;
      .price {
        font-size: 26px;
        color: #fe5c13;
      }
      .save-count {
        font-size: 16px;
        color: #4a4a4b;
      }
    }
  }
  .body {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }
  // 提取共用样式到基础类
  .btn-base {
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    border-radius: 99px;
    margin: 20px 0 5px;
  }

  // 购物车按钮
  .btn-cart {
    .btn-base(); // 继承基础样式
    background-color: #ff9402;

    &:active {
      background-color: darken(#ff9402, 10%);
    }
  }

  // 购买按钮
  .btn-buy {
    .btn-base(); // 继承基础样式
    background-color: #f11826;

    &:active {
      // 你的原始代码中，这里用的是和购物车按钮一样的颜色
      // background-color: rgba(255, 148, 2, 0.5);
      // 如果你想让它变深，可以这样写：
      background-color: darken(#f11826, 10%);
    }
  }

  // 空状态按钮
  .btn-empty {
    .btn-base(); // 继承基础样式
    background-color: rgba(0, 0, 0, 0.3);
  }
}
.goods-introduce {
  // 使用 ::v-deep 穿透 scoped 的限制，去影响 v-html 内部的元素
  ::v-deep img {
    // 设置最大宽度为100%，图片就不会超出其父容器
    max-width: 100%;
    // 使用 !important 来强制覆盖 img 标签上写死的内联样式 width: 414px
    width: 100% !important;
    // 高度自动，防止图片拉伸变形
    height: auto;
    // 有时候后端返回的图片可能不在 p 标签里，设置成块级元素可以避免一些布局小问题
    display: block;
  }
}
</style>
