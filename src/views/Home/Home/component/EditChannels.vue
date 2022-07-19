<template>
  <van-popup
    v-model="isShow"
    closeable
    position="bottom"
    :style="{ height: '100%' }"
    close-icon-position="top-left"
  >
    <div class="popupMain">
      <div class="my-channel">
        <van-cell title="我的频道">
          <van-button
            size="small"
            round
            class="edit-btn"
            @click="isEdit = !isEdit"
            >{{ isEdit ? '完成' : '编辑' }}</van-button
          >
        </van-cell>
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            :text="item.name"
            v-for="(item, index) in myChannels"
            :key="item.id"
            @click="onClickMyChannel(item, index)"
            :class="{ 'acticive-channel': item.name === '推荐' }"
          >
            <template #icon>
              <van-icon
                name="cross"
                v-show="isEdit && item.name !== '推荐'"
              ></van-icon>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="recommend-channel">
        <!-- 推荐平道的标题 -->
        <van-cell title="推荐频道"></van-cell>
        <!-- 推荐平道 -->
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            :text="item.name"
            icon="plus"
            v-for="item in recommendChannels"
            :key="item.id"
            @click="addMychannel(item)"
          >
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/api'
export default {
  name: 'editChannels',
  data () {
    return {
      isShow: true, // 弹出层
      allChannels: [],
      isEdit: false
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels () {
      const { data } = await getAllChannels()
      console.log(data)
      this.allChannels = data.data.channels
    },
    onClickMyChannel (channel, index) {
      if (this.isEdit && channel.name !== '推荐') {
        this.$emit('del-Mychannel', channel.id)
      }
      if (!this.isEdit) {
        this.isShow = false
        this.$emit('change-active', index)
      }
    },
    addMychannel (myChannel) {
      // { ...myChannel }利用展开运算符浅克隆一份对象，好处是 以后修改不是同一个地址，会少很多bug
      this.$emit('add-mychannel', { ...myChannel })
    }
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter((item) => {
        return !this.myChannels.find((i) => i.id === item.id)
      })
    }
  }
}
</script>

<style scoped lang="less">
.popupMain {
  padding-top: 100px;
  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 0.026rem solid red;
  }
  .my-channel {
    .acticive-channel {
      /deep/.van-grid-item__text {
        color: red;
      }
    }

    :deep(.van-grid-item__content) {
      position: relative;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        /deep/.van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          line-height: 0.32rem;
        }
      }
    }
  }
  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
