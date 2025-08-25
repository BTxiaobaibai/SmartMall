<template>
  <div>
    <router-view/>
    <van-tabbar route v-model="active" active-color="#ee0a24" inactive-color="#000" fixed>
      <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/classification" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'MyTab',
  data () {
    return {
      active: 1
    }
  }
}
</script>

<style>

</style>
