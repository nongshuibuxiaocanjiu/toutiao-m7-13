<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <input type="file" hidden ref="file" @change="onFileChange" />

    <!-- 个人信息 -->
    <van-cell
      class="avatar-cell"
      title="头像"
      is-link
      center
      @click="$refs.file.click()"
    >
      <van-image class="avatar" round fit="cover" :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isShowUpdateName = true"
    />
    <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link />
    <van-cell title="生日" :value="user.birthday" is-link />
    <!-- /个人信息 -->

    <!-- 编辑昵称 -->
    <van-popup style="height: 85%" v-model="isShowUpdateName" position="bottom">
      <update-name
       @close="isShowUpdateName = false"
       v-model="user.name"
        />
    </van-popup>
    <!-- /编辑昵称 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import updateName from './commpoents/update-name.vue'
export default {
  name: 'UserProfile',
  components: {
    updateName
  },
  props: {},
  data () {
    return {
      user: {},
      isShowUpdateName: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        console.log(data)
        this.user = data.data
      } catch (error) {
        this.$toast.fail('获取数据失败，请重试')
      }
    },
    onFileChange () {
      // 头像
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 获取blob数据
      const imgUrl = window.URL.createObjectURL(file)
      console.log(imgUrl)
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }
    .avatar {
      width: 60px;
      height: 60px;
    }
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
