import Vue from 'vue'
import Vuex from 'vuex'
// import storage from '@/utils/storage'
import { getToken, setToken } from '@/utils'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getToken() || {},
    id: ''
  },
  mutations: {
    // 设置token
    setUser (state, payload) {
      state.user = payload
      setToken(payload)
    },
    Id (state, payload) {
      state.id = payload
    }
  }
})
