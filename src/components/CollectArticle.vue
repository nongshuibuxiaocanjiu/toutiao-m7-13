<template>
  <van-icon
    :color="value ? '#ffa500' : ''"
    :name="value ? 'star' : 'star-o'"
    @click="onCollect"
    :loading="loading"
  />
</template>

<script>
import { addArticleCollection, delArticleCollection } from '@/api/article'
export default {
  name: 'collectArticle',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onCollect () {
      this.loading = true
      try {
        if (this.value) {
          await delArticleCollection(this.articleId)
        } else {
          await addArticleCollection(this.articleId)
        }
        // 更新视图
        this.$emit('input', !this.value)
        this.$toast.success(this.value ? '取消收藏' : '收藏成功')
      } catch (error) {
        this.$toast.fail('操作失败,请重试!')
      }
      // 请求结束
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less"></style>
