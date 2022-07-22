<template>
  <div>
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-history', [])">全部删除 </span>
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
    >
      <van-icon name="close" v-if="isDeleteShow" @click="delfn(index)" />
    </van-cell>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isDeleteShow: false
    }
  },
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  methods: {
    delfn (index) {
      this.$emit('delfn', index)
    }
  }
}
</script>

<style></style>
