<template>
  <div class="search-page">
    <!-- 组件库导航栏,头部 -->
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)"/>
    <van-search v-model="value" show-action placeholder="请输入搜索关键词">
      <template #action>
        <div @click="upSearch(value)">搜索</div>
      </template>
    </van-search>
    <div class="search-history">
      <div class="title">
        <span>最近搜索</span>
        <van-icon @click="clear" name="delete-o" />
      </div>
      <div class="list">
        <div class="list-item" v-for="item in history" :key="item" @click="upSearch(item)">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistory, setHistory } from '@/utils/storage'
export default {
  name: 'MySearch',
  data () {
    return {
      value: '',
      history: getHistory()
    }
  },
  methods: {
    upSearch (key) {
      // const res = this.history.indexOf(key)
      // if (res !== -1) {
      //   this.history.splice(res, 1)
      // }
      // this.history.unshift(key)
      // this.value = ''
      if (!key) {
        return
      }
      const newHis = this.history.filter((item) => item !== key)
      // console.log(newHis)
      newHis.unshift(key)
      this.history = newHis
      setHistory(this.history)
      this.value = ''
      // 跳转，筛选用query传参
      this.$router.push(`/goodslist?search=${key}`)
    },
    clear () {
      this.$dialog.confirm({
        title: '确定清空历史吗'
      })
        .then(() => {
          this.history = []
          setHistory([])
          this.$toast({
            message: '清除成功',
            duration: '1000'
          })
        })
        .catch(() => {
          this.$toast({
            message: '已取消',
            duration: '1000'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.search-page {
 .van-search {
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
 }
 .search-history{
  .title {
    display: flex;
    justify-content: space-between;
    padding: 10px;

  }
  .list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    gap:5%;
    .list-item {
      border: #cbcdd0 1px solid;
      text-align: center;
      padding: 7px;
      line-height: 15px;
      font-size: 13px;
      width: 30%;
      overflow: hidden;
      text-overflow: ellipsis;
      border-radius: 20px;
      margin-bottom: 10px;
      white-space: nowrap;
    }
  }
 }
}
</style>
