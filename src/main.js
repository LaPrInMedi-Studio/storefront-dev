import { name, version } from './../package.json'
import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import { _config } from '@ecomplus/utils'
import App from './App.vue'
import router from './router/'
import store from './store/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#storefront-app')

console.log(`Starting ${name}@${version} with Store ID #${_config.get('store_id')}`)
