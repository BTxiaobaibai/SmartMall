<template>
  <div class="count-box">
    <div class="sub" @click="subFn">-</div>
    <input type="text" class="inp" :value="value" @change="changeFn"/>
    <div class="add" @click="addFn">+</div>
  </div>
</template>

<script>
export default {
  name: 'CountBox',
  data () {
    return {

    }
  },
  props: {
    value: {
      type: Number
    }
  },
  created () {
    this.$store.dispatch('cart/getCartList')
  },
  methods: {
    subFn () {
      if (this.value <= 1) {
        return
      }
      this.$emit('input', this.value - 1)
    },
    addFn () {
      this.$emit('input', this.value + 1)
    },
    changeFn (e) {
      const num = +e.target.value
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return
      }
      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less" scoped>
.count-box {
  display: flex;
  height: 30px;
  width: 110px;
  .sub,.add {
    width: 30px;
    // height: 100%;
    background-color: #efefef;
    text-align: center;
    line-height: 30px;
    border-radius: 3px;
    &:active {
      background-color: darken(#efefef,10%);
    }
  }
  .inp {
    width: 40px;
    background: #efefef;
    text-align: center;
    margin: 0 5px;
    border:none;
    border-radius: 3px;
  }
}
</style>
