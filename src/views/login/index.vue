<template>
  <div>
    <!-- 组件库导航栏,头部 -->
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="$router.replace(url)"
    />
    <!-- 自定义body -->
    <div class="container">
      <div class="header">
        <h1>手机号登录</h1>
        <p>未注册的手机号登录后将自动注册</p>
      </div>
      <div class="body">
        <div class="inputbox">
          <input class="inpt" v-model="phone" type="text" name="phonenumber" placeholder="请输入手机号码">
        </div>
        <div class="inputbox">
          <input class="inpt" v-model="checkCode" type="text" name="checkword" placeholder="请输入图形验证码">
          <img :src="baseUrl" v-if="baseUrl" alt="" @click="getPicCode">
        </div>
        <div class="inputbox">
          <input class="inpt" v-model="phoneCode" type="text" name="checkcode" placeholder="请输入短信验证码">
          <button class="codebtn" @click="getPhCode">{{totalSecond === second ? '获取验证码' : second + '秒后重新发送'}}</button>
        </div>
      </div>
      <div class="footer">
        <button class="logging" @click="logging">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getMessageCode, loginFn } from '@/api/login' // 按需导入(命名导入)
export default {
  name: 'MyLogin',
  data () {
    return {
      baseUrl: '',
      key: '',
      totalSecond: 60,
      second: 60,
      timer: null,
      phone: '',
      checkCode: '',
      phoneCode: ''

    }
  },
  created () {
    this.getPicCode()
  },
  computed: {
    url () {
      return this.$route.query.backUrl || '/'
    }
  },
  methods: {
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      console.log(base64, key)
      this.baseUrl = base64
      this.key = key
    },
    check () {
      if (!/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(this.phone)) {
        this.$toast('请输入正确手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.checkCode)) {
        this.$toast('请输入正确验证码')
        return false
      }
      return true
    },
    async getPhCode () {
      if (!this.check()) { // 返回true，验证成功=>false 不执行
        return
      }
      await getMessageCode(this.baseUrl, this.key, this.checkCode)
      this.$toast('验证码发送成功')
      if (!this.timer && this.totalSecond === this.second) {
        this.timer = setInterval(() => {
          this.second--
          if (this.second < 1) {
            clearInterval(this.timer)
            this.second = this.totalSecond
            this.timer = null
          }
        }, 1000)
        this.$toast('验证码发送成功')
      }
    },
    async logging () {
      // 表单验证
      if (!this.check()) {
        return
      }
      if (!/^\d{6}$/.test(this.phoneCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      const res = await loginFn(this.phone, this.phoneCode) // 全局变量，不要用this.
      this.$store.commit('user/setuserInfo', res.data)
      console.log(res)
      this.$toast('登录成功')
      this.$router.replace(this.url)
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }

}
</script>

<style lang="less" scoped>
.container{
  display:flex;
  flex-direction: column;
  padding: 49px 29px;
  // justify-content: center;
  .header{
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  // justify-content: center;
  p{
    color: #b8bbbe;
  }
}
.body{
  // display: flex;
  // align-items: center;
  // flex-direction: column;
  .inputbox{
    border-bottom: #b8bbbe 1px solid;
    border-bottom: 1px solid #f3f1f2;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    // flex-direction: column;
    padding: 8px;
    .codebtn{
      border:none;
      color: #e1b87c;
      background-color: #fff;
    }
  }
  .inpt{
    display: block;
    outline: none;
    border:none;
    height: 32px;
    flex: 1;
  }
  img{
    height: 31px;
    width: 94px;
  }
  }
  .logging{
    width: 100%;
    height: 42px;
    border-radius: 100px;
    background:linear-gradient(to right,#ecb43b,#ff9312);
    border:none;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1) ;
    color: #fff;
  }
}

</style>
