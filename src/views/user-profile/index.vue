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
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="isShowUpdateGender = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isShowUpdateBirthdy = true"
    />
    <!-- /个人信息 -->

    <!-- 编辑昵称 -->
    <van-popup style="height: 85%" v-model="isShowUpdateName" position="bottom">
      <update-name @close="isShowUpdateName = false" v-model="user.name" />
    </van-popup>
    <!-- /编辑昵称 -->

    <!-- 编辑性别弹层 -->
    <van-popup v-model="isShowUpdateGender" position="bottom">
      <update-gender
        v-if="isShowUpdateGender"
        v-model="user.gender"
        @close="isShowUpdateGender = false"
      />
    </van-popup>
    <!-- 编辑昵称弹层 -->

    <!-- 编辑生日弹层 -->
    <van-popup v-model="isShowUpdateBirthdy" position="bottom">
      <updateBirthday
        v-if="isShowUpdateBirthdy"
        v-model="user.birthday"
        @close="isShowUpdateBirthdy = false"
      ></updateBirthday>
    </van-popup>
    <!-- 编辑生日弹层 -->

    <!-- 编辑头像弹层 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      style="height: 100%"
      position="bottom"
    >
      <updatePhoto
        v-if="isUpdatePhotoShow"
        @close="isUpdatePhotoShow = false"
        :img="img"
        @update-photo="user.photo = $event"
      ></updatePhoto>
    </van-popup>
    <!-- 编辑头像弹层 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import updateName from './commpoents/update-name.vue'
import updateGender from './commpoents/update-gender.vue'
import updateBirthday from './commpoents/update-birthdy.vue'
import updatePhoto from './commpoents/update-photo.vue'

export default {
  name: 'UserProfile',
  components: {
    updateName,
    updateGender,
    updateBirthday,
    updatePhoto
  },
  props: {},
  data () {
    return {
      user: {},
      isShowUpdateName: false, // 名字
      isShowUpdateGender: false, // 性别
      isShowUpdateBirthdy: false,
      isUpdatePhotoShow: false,
      img: null
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
      // 获取上传文件
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      // 同一张图片，change事件不会触发
      this.$refs.file.value = ''
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
