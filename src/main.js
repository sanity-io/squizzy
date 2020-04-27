import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.config.productionTip = false

Vue.use(Vue2TouchEvents)

Vue.prototype.$appName = 'Squizzy'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
