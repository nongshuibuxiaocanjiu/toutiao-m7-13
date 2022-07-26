<template>
  <div class="update-birthdy">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updataUserProfile } from '@/api/user'
import dayJs from 'dayjs'

export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await updataUserProfile({
          birthday: dayJs(this.currentDate).format('YYYY-MM-DD')
        })

        this.$emit('input', dayJs(this.currentDate).format('YYYY-MM-DD'))
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast('更新失败')
      }
    }
  }
}
</script>

<style></style>
