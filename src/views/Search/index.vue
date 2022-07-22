<template>
  <div>
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        class="search"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        background="#3296fa"
        @cancel="backToPrepage"
        @focus="visibleSearchSuggestion"
      />
    </form>
    <!-- 头部搜索页 -->
    <!-- <SearchSuggestion></SearchSuggestion>
    <SearchResult></SearchResult>
    <SearchHistory></SearchHistory> -->
    <component
      :is="componentName"
      :keywords="keywords"
      @search="onSearch"
      :searchHistories="searchHistories"
      @clear-search-history="searchHistories = []"
      @delfn="delFn"
    ></component>
  </div>
</template>

<script>
import SearchSuggestion from './commponents/SearchSuggestion.vue'
import SearchResult from './commponents/SearchResult.vue'
import SearchHistory from './commponents/SearchHistory.vue'
// import { get, set } from '@/utils/storage'

export default {
  name: 'search-index',
  components: {
    SearchSuggestion,
    SearchResult,
    SearchHistory
  },
  data () {
    return {
      keywords: '',
      isShowSearchResults: false,
      searchHistories: this.$store.state.history
    }
  },
  computed: {
    componentName () {
      if (this.keywords.trim() === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResults) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  methods: {
    onSearch (val) {
      this.keywords = val
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)

      this.isShowSearchResults = true
    },
    backToPrepage () {
      this.$router.go(-1)
    },
    visibleSearchSuggestion () {
      this.isShowSearchResults = false
    },
    delFn (index) {
      this.searchHistories.splice(index, 1)
    }
  },
  watch: {
    searchHistories (val) {
      // 同步到本地存储
      this.$store.commit('sethis', val)
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
