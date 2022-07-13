<template>
  <div>
    <van-nav-bar class="navbar" title="标题" @click-left="BackTOPrePage">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <!-- 表单 -->
    <van-form @submit="login">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-button size="mini" round class="code-btn">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  methods: {
    BackTOPrePage () {
      this.$router.back()
    },
    async login () {
      //   console.log('submit', values)
      const res = await login(this.mobile, this.code)
      console.log(res)
    }
  },
  data () {
    return {
      code: '',
      mobile: ''
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #2892ff;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
/deep/ .van-cell__title {
  flex: 1;
}
/deep/ .van-cell__value {
  flex: 20;
}
.toutiao {
  font-size: 0.49rem;
}
.code-btn {
  background-color: #eee;
  color: #666;
  padding: 0px 10px;
}
</style>
