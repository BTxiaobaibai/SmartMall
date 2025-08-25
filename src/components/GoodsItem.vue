<template>
  <div v-if="item.goods_id" class="good-list" @click="$router.push(`/detail/${item.goods_id}`)">
    <div class="left">
      <img :src="item.goods_image" alt="">
    </div>
    <div class="right">
      <p class="title text-ellipsis-2">{{item.goods_name}}</p>
      <p class="total">已售{{item.goods_sales}}件</p>
      <p class="price">
        <span class="new">￥{{item.line_price_min}}</span>
        <span class="old">￥{{item.line_price_max}}</span>
        </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsItem',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.good-list {
  height: 148px;
  margin-bottom: 6px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  .left {
    margin-right: 10px;
    width: 127px;
    img {
      display: block;
      width: 100%;
    }
  }
  .right {
    flex:1;
    .title {
      font-size: 14px;
    }
    .total {
      padding: 10px 0;
      color:#c4a699;
      font-size: 12px;
    }
    .price {
      .new {
        margin-right: 10px;
        font-size: 16px;
        color: #f13a31;
      }
      .old {
        text-decoration: line-through;
        font-size: 12px;
        color: #c4a699;
      }
    }
  }
}
</style>
