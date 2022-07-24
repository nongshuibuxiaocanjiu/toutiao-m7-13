<template>
  <div class="update_name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="编辑昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
    />
    <!-- /导航栏 -->
    <div style="padding: 10px">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入新昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'update_name',
  data () {
    return {
      localName: this.value
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.van-popup {
  background: #f5f7f9;
}
</style>
