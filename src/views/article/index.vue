<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->
      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">{{ article.pubdate }}</div>
          <!-- 关注用户 -->
          <FollowUser
            :is_followed="article.is_followed"
            :user_id="article.aut_id"
            @update-follow="article.is_followed = $event"
          ></FollowUser>
          <!-- /关注用户 -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 文章评论 -->
        <articleComments
          @click-reply="onReplyShow"
          :articleId="article.art_id"
          :list="commentList"
          @onload-success="totalCommentCount = $event.total_count"
        ></articleComments>
        <!-- /文章评论 -->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
            >写评论</van-button
          >
          <!-- 评论 -->
          <van-popup v-model="isPostShow" position="bottom">
            <post-comment
              :target="article.art_id"
              @onpost-success="onPostSuccess"
              :commentList="commentList"
            />
          </van-popup>
          <!-- 评论回复 -->
          <van-popup
            v-model="isReplyShow"
            position="bottom"
            style="height: 85%"
          >
            <!-- 回复的回复 -->
            <articleHuifu
              :target="article.art_id"
              :currentComment="currentComment"
            />
          </van-popup>
          <!-- /评论回复 -->

          <van-icon name="comment-o" :info="totalCommentCount" color="#777" />
          <!-- 收藏 ---------------->
          <CollectArticle
            v-model="article.is_collected"
            :articleId="article.art_id"
          />

          <!-- /收藏 -->
          <!-- 点赞---------- -->
          <likeArticle
            class="likeArticle"
            v-model="article.attitude"
            :articleId="article.art_id"
          />
          <!-- /点赞 -->

          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus == 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticleById"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { addFollow, deleteFollow } from '@/api/user'
import FollowUser from '@/components/FollowUser.vue'
import CollectArticle from '@/components/CollectArticle.vue'
import likeArticle from '@/components/lickArticle.vue'
import articleComments from '@/components/article-comment.vue'
import postComment from '@/components/post-comment.vue'
import articleHuifu from '@/components/article_huifu.vue'
export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    likeArticle,
    articleComments,
    postComment,
    articleHuifu
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章详情
      loading: true, // 加载状态
      errStatus: 0, // 失败状态码
      followLoading: false,
      totalCommentCount: 0,
      isPostShow: false,
      commentList: [], // 评论列表
      isReplyShow: false,
      currentComment: {} // 点击回复的那个评论对象
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArticleById()
    this.$store.commit('Id', this.articleId)
  },
  mounted () {},
  methods: {
    async getArticleById () {
      this.followLoading = true

      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        console.log(data)
        this.article = data.data
        this.loading = false
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        this.loading = false
      }
    },
    async onFollow () {
      try {
        if (this.article.is_followed) {
          await deleteFollow(this.article.aut_id)
        } else {
          await addFollow(this.article.aut_id)
        }
        this.article.is_followed = !this.article.is_followed
      } catch (err) {
        let message = '操作失败，请重试！'
        if (err.response && err.response.status === 400) {
          message = '你不能关注你自己'
        }
        this.$toast(message)
      }
      this.loading = false
      this.followLoading = false
    },
    onPostSuccess (res) {
      console.log(res)
      this.commentList.unshift(res.new_obj)
      this.isPostShow = false
    },
    onReplyShow (item) {
      console.log(item)
      this.currentComment = item
      this.isReplyShow = true
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  /deep/.van-nav-bar__content {
    background-color: #2892ff;
  }
  /deep/.van-icon-arrow-left {
    color: #fff;
  }
  /deep/.van-nav-bar__title {
    color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
  /deep/.likeArticle {
    z-index: 999;
  }
}
</style>
