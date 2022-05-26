import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    slidemenus: [],
    bread: [],//面包屑
    user: JSON.parse(window.sessionStorage.getItem('rightlist')) || '{}'//拿入header中
  },
  getters: {
  },
  mutations: {
    //侧边栏
    getslideMenus (state, preload) {
      state.slidemenus = preload
    },
    //添加面包屑
    addBread (state, preload) {
      state.bread = preload
    },
    //登录
    getLogin (state, preload) {
      state.user = preload
      //将数据存储
      window.sessionStorage.setItem('rightlist', JSON.stringify(preload))
    }
  },
  actions: {
  },
  modules: {
  }
})
