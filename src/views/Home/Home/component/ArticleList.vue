<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="loadNextPage"
      success-text="加载成功"
    >
      <van-list
        @load="loadNextPage"
        offset="1"
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'articleList',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    ArticleItem
  },
  data () {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshing: false
    }
  },
  methods: {
    async getArticleList () {
      try {
        const { data } = await getArticleList(this.id, +new Date())
        // console.log(data)
        this.pre_timestamp = data.data.pre_timestamp
        this.articles = data.data.results
      } catch (err) {
        const status = err.response.status
        if (status === 400) {
          throw new Error(err.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败，请重试')
        }
      }
    },

    async loadNextPage () {
      try {
        // if (Math.random() < 0.7) {
        //   throw new Error('错误了')
        // }
        const { data } = await getArticleList(this.id, this.pre_timestamp)
        // console.log(data)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }

        if (this.refreshing) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }

        this.pre_timestamp = data.data.pre_timestamp
        this.loading = false
      } catch (err) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshing = false
      }
    }
  },
  created () {
    this.getArticleList()
  }
}
</script>

<style lang="less" scoped>
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
