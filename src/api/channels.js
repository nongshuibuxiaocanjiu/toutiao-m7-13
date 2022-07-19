import request from '@/utils/request'
import storage from '@/utils/storage'

// 获取我的列表
export const getMyChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
// 获取所有平道列表
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
/**
 *
 * @param {String|Number} target 删除用户平道
 * @returns Promise
 */
export const delMyChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

export const addMyChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

// 本地存储中存和取我的平道的数据

const HEIMA_TOUTIAO_CHANNELS = 'HEIMA_TOUTIAO_CHANNELS'

// 读取本地存储
export const getMyChannelsByLocal = () => storage.get(HEIMA_TOUTIAO_CHANNELS)

// 设置本地存储，传值
export const setMyChannelsByLocal = (channel) =>
  storage.set(HEIMA_TOUTIAO_CHANNELS, channel)
