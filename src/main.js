import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import Api from './api/index'
import './assets/css/normalize.css'
import './mock'
import i18n from './i18n'
import './common/permission.js'
//通过原型的方法调用
Vue.prototype.$Api = Api
Vue.config.productionTip = false
new Vue({
  i18n,
  router,
  store,
  beforeCreate () {
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#app')
