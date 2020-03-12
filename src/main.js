import Vue from 'vue'
import App from './App.vue'
import {router} from "./router/index"
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs'
import store from './store/index'


Vue.use(Element)
Vue.config.productionTip = false
Vue.prototype.$qs = qs
store.dispatch('getAsideMenu')

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')