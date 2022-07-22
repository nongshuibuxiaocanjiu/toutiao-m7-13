<template>
  <div>
    <van-cell
      v-for="(item, index) in highlightData"
      :key="index"
      @click="$emit('search', suggestions[index])"
    >
      <template #icon>
        <van-icon name="search" class="search-icon"></van-icon>
      </template>

      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api'
import { debounce } from 'lodash'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  watch: {
    keywords: {
      immediate: true,
      deep: true,
      handler: debounce(function (val) {
        // console.log(val)
        this.getSearchSuggestion(val)
      }, 300)
    }
  },
  methods: {
    async getSearchSuggestion () {
      try {
        const res = await getSearchSuggestion(this.keywords)
        console.log(res)
        if (res.data.data.options.length === 0) {
          this.$toast.fail('没有搜索建议')
        }
        this.suggestions = res.data.data.options.filter(Boolean)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    highlightData () {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((str) =>
        str.replace(reg, (match) => `<span style="color: red">${match}</span>`)
      )
    }
  }
}
</script>

<style scoped lang="less">
.search-icon {
  padding-top: 10px;
}
</style>
