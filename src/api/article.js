import request from '@/utils/request'

// 获取文章列表
export const getArticleById = (articleId) => {
  return request({
    url: '/v1_0/articles/' + articleId
  })
}
