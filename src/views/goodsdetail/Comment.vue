<template>
  <div class="comment">
    <van-nav-bar title="所有评论"   left-arrow @click-left="$router.go(-1)"/>
    <div class="under">
      <div class="under-list" v-for="item in commentsList" :key="item.create_time">
        <div class="usermsg">
          <img :src="item.user.avatar_url" alt="">
          <span>{{item.user.nick_name}}</span>
          <van-rate :value="item.score/2" allow-half void-icon="star" void-color="#eee" color="#ffd21e" readonly />
        </div>
        <p class="commcontent">{{item.content}}</p>
        <p class="time">{{item.create_time}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getCommentsData } from '@/api/product'
export default {
  name: 'MyComment',
  data () {
    return {
      commentsData: '', // 请求评价总数据
      commentsList: ''
    }
  },
  async created () {
    const comments = await getCommentsData({ goodsId: this.$route.params.id, limit: 999999999999 })
    this.commentsList = comments.data.list
    this.commentsData = comments.data
    // console.log(comments)
  }
}
</script>

<style lang="less" scoped>
.comment {
  .under {
    padding: 0 10px;
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
        word-break: break-all;
      }
      .time {
        padding: 0;
        color: #9ea1a6;
        font-size: 14px;
      }
    }
  }
}
</style>
