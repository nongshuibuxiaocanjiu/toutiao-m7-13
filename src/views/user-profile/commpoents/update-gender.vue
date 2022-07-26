<template>
  <van-picker
    title="性别"
    show-toolbar
    :columns="columns"
    :default-index="value"
    @cancel="$emit('close')"
    @change="onChange"
    @confirm="onClickRight"
  />
</template>

<script>
import { updataUserProfile } from '@/api/user'
export default {
  name: 'gender',
  data () {
    return { columns: ['男', '女'], gender: this.value }
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    async onClickRight () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await updataUserProfile({
          gender: this.gender
        })
        this.$emit('input', this.gender)
        this.$emit('close')
        this.$toast('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
    onChange (picker, value, index) {
      this.gender = index
    }
  }
}
</script>

<style scoped lang="less"></style>
