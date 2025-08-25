<template>
  <div class="container" v-if="searchData.params">
    <van-nav-bar title="商城" fixed/>
    <van-search
      v-model="value"
      :placeholder="searchData.params.placeholder"
      shape="round"
      background="#fff"
      @click="$router.push('/search')"
     /> <!-- v-if="searchData.params"=>有数据再渲染(异步) -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in swipeData" :key="item.imgUrl">
        <img :src="item.imgUrl" alt="">
      </van-swipe-item>
    </van-swipe>
    <van-grid :column-num="5">
      <van-grid-item v-for="item in gridData" :key="item.imgUrl" :icon="item.imgUrl" icon-size="40" :text="item.text" />
    </van-grid>
<!--     <van-grid :column-num="5">
      <van-grid-item v-for="value in 10" :key="value" @click="$router.push('/pay')">
        <img src="@/assets/nav1.png" />
        <p>新品首发</p>
      </van-grid-item>
    </van-grid> -->
    <div class="main">
      <img src="@/assets/main.png" alt="">
    </div>
    <div class="guess">
      <div class="gulike">
        <p>——猜你喜欢——</p>
      </div>
      <div>
        <GoodsItem v-for="item in GoodsData" :key="item.goods_id" :item="item"></GoodsItem>
      </div>
    </div>
  </div>
</template>

<script>
import Img from '@/assets/nav1.png'
import GoodsItem from '@/components/GoodsItem.vue'
import { getHomeData } from '@/api/home'
export default {
  name: 'MyHome',
  data () {
    return {
      value: '',
      Img,
      searchData: '',
      swipeData: '',
      gridData: '',
      GoodsData: ''
    }
  },
  async created () {
    const res = await getHomeData()
    // console.log(res)
    this.searchData = res.data.pageData.items[0]
    this.swipeData = res.data.pageData.items[1].data
    this.gridData = res.data.pageData.items[3].data
    this.GoodsData = res.data.pageData.items[6].data
  },
  components: {
    GoodsItem
  }
}
</script>

<style lang="less" scoped>
.container {
  padding-top: 100px;
  padding-bottom: 50px;
  .van-nav-bar {
  z-index: 999;
  background-color: #c21401;
    ::v-deep .van-nav-bar__title {
      color: #fff;
    }
  }
  .van-search{
    position: fixed;
    // border-radius: 100px;
    width: 100%;
    top: 46px;
    z-index: 999;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    height: 185px;
    background-color: #39a9ed;
    img{
      height: 185px;
    }
  }
  .van-grid {
    img {
      height: 40px;
    }
  }
  .main {
    img {
      // height: auto;
      display: block;
      width: 100%;
    }
  }
  .guess{
    .gulike{
      display:flex;
      justify-content: center;
    }
  }
}
</style>
