import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ajax from 'axios'
import md5 from 'js-md5'
Vue.config.productionTip = false
Vue.use(element)
Vue.prototype.$md5 = md5
Vue.prototype.$ajax = ajax
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
