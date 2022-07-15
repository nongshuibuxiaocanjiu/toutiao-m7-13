<template>
  <div>
    <van-nav-bar class="navbar" title="标题" @click-left="BackTOPrePage">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <!-- 表单 -->
    <van-form ref="from" @submit="login">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="手机号"
        :rules="mobileRules"
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
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-count-down
            :time="3 * 1000"
            v-if="isShowCountDown"
            @finish="isShowCountDown = false"
          />
          <van-button
            size="mini"
            round
            class="code-btn"
            @click="sendCode"
            v-else
            >发送验证码</van-button
          >
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
import { login, sendCode } from '@/api/user'
import { mobileRules, codeRules } from './rules.js'
export default {
  methods: {
    BackTOPrePage () {
      this.$router.back()
    },
    async login () {
      //   console.log('submit', values)
      try {
        const res = await login(this.mobile, this.code)
        // console.log(res)
        this.$store.commit('setUser', res.data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (e) {
        const status = e.response.status
        let message = '登录错误,请刷新'
        if (status === 400) {
          message = e.response.data.message
        }
        this.$toast.fail(message)
        // switch (status) {
        //   case 400:
        //     this.$toast.fail(e.response.data.message)
        //     break
        //   case 507:
        //     this.$toast.fail('登录错误，请重试')
        //     break
        //   default:
        //     this.$toast.fail('登录错误，请重试')
        //     break
        // }
      }
    },
    async sendCode () {
      try {
        await this.$refs.from.validate('mobile')
        await sendCode(this.mobile)
        this.isShowCountDown = true
      } catch (err) {
        // this.$toast.fail('手机号非法')
        if (!err.response) {
          this.$toast.fail('手机号格式不正确')
        } else {
          const status = err.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(err.response.data.message)
          }
        }
      }
    }
  },
  data () {
    return {
      code: '',
      mobile: '',
      mobileRules,
      codeRules,
      isShowCountDown: false
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
