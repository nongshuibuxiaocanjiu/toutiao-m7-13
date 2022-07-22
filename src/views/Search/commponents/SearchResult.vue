<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'

export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 2,
      per_page: 20
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getSearchResults({
          page: this.page,
          per_page: this.per_page,
          q: this.keywords
        })
        console.log(data)
        console.log(this.keywords)
        const { results } = data.data
        this.list.push(...results)
        // 3. 设置加载状态结束
        this.loading = false

        // 4. 判断数据是否加载完毕
        if (results.length) {
          this.page++ // 更新获取下一页数据的页码
        } else {
          this.finished = true
        }
      } catch (err) {}
    }
  },
  created () {
    console.log(this.onLoad())
  }
}
</script>

<style></style>
