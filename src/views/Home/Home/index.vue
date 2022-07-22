<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round @click="$router.push('/search')">
          <van-icon name="search" />
          搜索
        </van-button>
      </template>
    </van-nav-bar>
    <!-- tabs选项卡 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in mychannels" :key="item.id" :title="item.name">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <!-- 更多 -->
      <span class="toutiao toutiao-gengduo" @click="showPopup"></span>
    </van-tabs>
    <!-- 弹出层 -->
    <EditChannels
      ref="popup"
      :myChannels="mychannels"
      @del-Mychannel="delMychannelFn"
      @change-active="changeActive"
      @add-mychannel="addMychannelFn"
    ></EditChannels>
  </div>
</template>

<script>
import {
  getMyChannels,
  getMyChannelsByLocal,
  setMyChannelsByLocal,
  delMyChannel,
  addMyChannel
} from '@/api'
import ArticleList from './component/ArticleList.vue'
import EditChannels from './component/EditChannels.vue'
export default {
  data () {
    return {
      active: 0,
      mychannels: []
    }
  },
  components: {
    ArticleList,
    EditChannels
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    async getMyChannels () {
      try {
        if (!this.isLogin) {
          // 如果你是离线状态
          // 1如果本地存储有数据,直接用本地存储的数据
          // 2如果本地存储没数据,发送请求获取默认频道数据

          const myChannels = getMyChannelsByLocal()

          if (myChannels) {
            this.mychannels = myChannels
          } else {
            const { data } = await getMyChannels()
            this.mychannels = data.data.channels
          }
        } else {
          // 如果你是登录状态
          // 发请求获取的
          const { data } = await getMyChannels()
          this.mychannels = data.data.channels
        }
      } catch (err) {
        this.$toast.fail('请重新获取列表')
      }
    },
    showPopup () {
      this.$refs.popup.isShow = true
      console.log(this.$refs.popup)
    },
    changeActive (active) {
      this.active = active
    },

    async delMychannelFn (id) {
      // 删除我的平道
      this.mychannels = this.mychannels.filter((item) => item.id !== id)
      if (!this.isLogin) {
        // 如果你是离线状态
        // 数据存储在本地存储中

        setMyChannelsByLocal(this.mychannels)
      } else {
        //
        try {
          await delMyChannel(id)
        } catch (err) {
          return this.$toast.fail('删除用户频道失败')
        }
        this.$toast.success('删除用户频道成功')
      }
    },
    async addMychannelFn (channel) {
      this.mychannels.push(channel)
      if (!this.isLogin) {
        // 如果你是离线状态
        // 数据存储在本地存储中
        setMyChannelsByLocal(this.mychannels)
      } else {
        try {
          await addMyChannel(channel.id, this.mychannels.length)
        } catch (err) {
          console.log(err)

          return this.$toast.fail('添加频道失败')
        }
      }
      this.$toast.success('添加频道成功')
    }
  },
  created () {
    this.getMyChannels()
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  z-index: 99;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/gradient-gray-line.png');
  }
}
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
