import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    tagCount: 0,
    //  isSignIn 登录状态，0为未登录
    isSignIn: 0,
    token: '',

  },
  mutations: {
    changIsSignIn(state, n) {
      state.isSignIn = n;
    },
    setToken(state, val) {
      state.token = val;
    },
    setCount(state, val) {
      state.count = val
    },
    setTagCount(state, val) {
      state.tagCount = val
    },
  },
  actions: {
  },
  modules: {
  }
})
