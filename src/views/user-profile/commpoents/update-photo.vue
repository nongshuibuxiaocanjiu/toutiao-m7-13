<template>
  <div class="update-avatar">
    <img :src="img" class="img" ref="img" />
    <div class="toolbar">
      <span class="cancel" @click="$emit('close')">取消</span>
      <span class="confirm" @click="onConfirm()">完成</span>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserAvatar } from '@/api/user'
export default {
  name: 'UpdatePhoto',
  props: {
    img: {
      type: [String, Object],
      retuired: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  mounted () {
    // 别忘了给当前的 img 增加ref 属性， 要不然获取不到
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })
  },
  methods: {
    onConfirm () {
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        // 创建formData数据
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await updateUserAvatar(formData)
        console.log(data)
        // 关闭弹层，更新视图
        this.$emit('close')
        this.$emit('update-photo', data.data.photo)
      })
    }
  }
}
</script>

<style scoped lang="less">
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .img {
    display: block;
    max-width: 100%;
  }
}
</style>
