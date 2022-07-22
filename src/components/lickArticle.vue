<template>
  <van-icon
    :color="value === 1 ? 'red' : ''"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    @click="onLike"
    :loading="loading"
  />
</template>

<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  data () {
    return {
      loading: false
    }
  },

  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },

  created () {},
  methods: {
    async onLike () {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          await deleteLike(this.articleId)
        } else {
          await addLike(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (error) {
        this.$toast.fail('点赞失败，请重试')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less"></style>
