<template>
  <div>
    <div class="header">{{ currentComment.reply_count }}条回复</div>

    <!-- 头部回复 -->
    <van-cell class="comment-item">
      <van-image
        slot="icon"
        class="avatar"
        round
        fit="cover"
        :src="currentComment.aut_photo"
      />
      <div slot="title" class="title-wrap">
        <div class="user-name">{{ currentComment.aut_name }}</div>
        <van-button class="like-btn" icon="good-job-o">赞</van-button>
      </div>

      <div slot="label">
        <p class="comment-content">{{ currentComment.content }}</p>
        <div class="bottom-info">
          <span class="comment-pubdate">{{ currentComment.pubdate }}</span>
          <van-button class="reply-btn" round>回复 </van-button>
        </div>
      </div>
    </van-cell>
    <!-- /头部回复 -->

    <!-- 底部的回复 -->
    <div style="font-size: 18px">全部回复</div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
      />
    </van-list>

    <!-- /底部的回复 -->
    <!-- 底部评论按钮 -->
    <van-button
      plain
      type="info"
      style="width: 100%"
      round
      @click="isPostShow = true"
      >评论</van-button
    >

    <!-- /底部评论按钮 -->
    <!-- 评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <postComment
        :target="currentComment.com_id"
        @onpost-success="onPostSuccess"
      />
    </van-popup>
  </div>
</template>

<script>
import commentItem from '@/components/comment-item.vue'
import { getComments } from '@/api/comment'
import postComment from '@/components/post-comment.vue'
export default {
  props: {
    currentComment: {
      type: Object
    }
    // target: [String, Object, Array]
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 20,
      isPostShow: false,
      commentList: [] // 评论列表
    }
  },
  components: {
    commentItem,
    postComment
  },
  created () {
    // console.log(this.currentComment)
  },
  methods: {
    async onLoad () {
      const { data } = await getComments({
        type: 'c', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.currentComment.com_id.toString(), // 源id，文章id或评论id
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
      })
      console.log(data)
      const { results } = data.data
      this.list.push(...results)
      this.loading = false
      // 4. 判断数据是否加载完毕
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    },
    onPostSuccess (res) {
      console.log(res)
      this.commentList.unshift(res.new_obj)
      this.isPostShow = false
    }
  }
}
</script>

<style scoped lang="less">
.header {
  text-align: center;
}
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
}
</style>
