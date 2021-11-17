import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/vantUi"
import "reset-css"


Vue.filter("RMBformat",function(val){
  return "￥"+Number(val).toFixed(2)+"元"
})






Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
