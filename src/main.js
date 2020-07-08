import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/icon.css'
import './assets/global.scss'
Vue.config.productionTip = false
// 引入了css文件，其中包括字体和全局css
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
