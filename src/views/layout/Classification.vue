<template>
  <div class="classification">
    <van-nav-bar title="全部分类" fixed/>
    <van-search shape="round" placeholder="请输入搜索关键词" @click="$router.push('/search')" background="#f1f1f2"/>
    <div class="down">
      <div class="left">
        <div class="left-list" v-for="(item,index) in leftList" :key="item.category_id" @click="leftIndex = index" :class="{active: index === leftIndex}">{{item.name}}</div>
      </div>
      <div class="right">
        <div class="right-list" v-for="item in leftList[leftIndex]?.children" :key="item.category_id" @click="$router.push(`/goodslist?goodsid=${item.category_id}`)">
          <img :src="item.image.external_url" alt="">
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getClassificationList } from '@/api/classification'
export default {
  name: 'MyClassification',
  data () {
    return {
      leftList: '',
      leftIndex: 0
    }
  },
  async created () {
    const res = await getClassificationList()
    this.leftList = res.data.list
    console.log(res)
  }
}
</script>

<style lang="less" scoped>

.classification {
  padding: 100px 0 50px 0;
  height: 100vh;
  .van-search {
    position:fixed;
    top:46px;
    width: 100%;
  }
  .down {
    display: flex;
    height: 100%;
    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      width: 85px;
      line-height: 45px;
      background-color: #f3f3f3;
      overflow: auto;
      .left-list {
        height: 45px;
        width: 100%;
        text-align: center;
      }
      .active {
        background-color: #fff;
        color: #fb8172;
      }

    }
    .right {
      flex:1;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: start;
      overflow: auto;
      height: 100%;
      .right-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 33.3%;
        img {
          height: 80px;
          width: 80px;
          margin-top: 5px;
        }
        p {
          font-size: 12px;
        }
      }
    }
  }
}

// .classification {
//   padding: 100px 0 50px 0;
//   height: 100vh;
//   .down {
//     display: flex;
//     height: 100%;
//     .left {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       overflow: auto;
//       width: 85px;
//       height: 100%;
//       background-color: #f3f3f3;
//       .left-list {
//         height: 45px;
//         line-height: 45px;
//         font-size: 14px;
//       }
//     }
//     .right {
//       flex: 1;
//       height: 100%;
//       background-color: #ffffff;
//       display: flex;
//       flex-wrap: wrap;
//       justify-content: flex-start;
//       align-content: flex-start;
//       padding: 10px 0;
//       overflow: auto;
//     }
//   }
// }
//   .van-search {
//     position:fixed;
//     width: 100%;
//     top: 46px;
//   }
</style>
