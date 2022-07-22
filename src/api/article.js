import request from '@/utils/request'

// 获取文章列表
export const getArticleById = (articleId) => {
  return request({
    url: '/v1_0/articles/' + articleId
  })
}

// 收藏文章 /v1_0/article/collections
export const addArticleCollection = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消收藏文章
export const delArticleCollection = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}
// 点赞文章;
export const addLike = (target) => {
  return request({
    method: 'POST',
    url: 'v1_0/article/likings',
    data: {
      target
    }
  })
}

// 取消点赞文章;
export const deleteLike = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}
