<template>
  <div class="search-list">
    <van-nav-bar title="商品列表" left-arrow @click-left="$router.go(-1)"/>
    <van-search show-action shape="round" placeholder="请输入搜索关键词" @click="$router.push('/search')">
      <template #action>
        <van-icon name="apps-o" size="20" @click="$router.push('/classification')" />
      </template>
    </van-search>
    <div class="screen">
      <div class="screen-list" @click="updateList({sortType: 'all', goodsName: $route.query.search,categoryId: $route.query.goodsid})">综合</div>
      <div class="screen-list" @click="updateList({sortType: 'sales',goodsName: $route.query.search,categoryId: $route.query.goodsid})">销量</div>
      <div class="screen-list" @click="updateList({sortType: 'price', goodsName: $route.query.search,categoryId: $route.query.goodsid})">价格</div>
    </div>
    <GoodsItem v-for="item in goodsList" :key="item.goods_id" :item="item"></GoodsItem>
  </div>
</template>

<script>
import { getProducts } from '@/api/product'
import GoodsItem from '@/components/GoodsItem.vue'
export default {
  name: 'MyGoodsList',
  data () {
    return {
      goodsList: '',
      tag: 0
    }
  },
  methods: {
    async updateList (obj) {
      if (obj.sortType === 'price') {
        this.tag = 1 - this.tag
        obj.sortPrice = this.tag
      }
      const res = await getProducts(obj)
      // console.log(res)
      this.goodsList = res.data.list.data
    // console.log(this.goodsList)
    }
  },
  created () {
    this.updateList({
      sortType: 'all',
      goodsName: this.$route.query.search,
      categoryId: this.$route.query.goodsid
    })
  },
  components: {
    GoodsItem
  }
}
</script>

<style lang="less" scopde>
.search-list {
  .van-search {
    .van-search__action {
      padding-top: 5px;
    }
  }
  .screen {
    display: flex;
    justify-content: space-around;
    .screen-list {
      font-size: 14px;
    }
  }
}
</style>
