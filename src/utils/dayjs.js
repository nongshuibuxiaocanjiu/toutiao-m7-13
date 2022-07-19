// 1。下载yjs 2.引入dayjs
import dayjs from 'dayjs'
// 3.封装 ==>new Date()
// console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn') // 全局使用简体中文

export default dayjs
