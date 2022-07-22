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
        const { results } = data.data
        this.list.push(...results)
      } catch (err) {}
    }
  },
  created () {
    console.log(this.onLoad())
  }
}
</script>

<style></style>
