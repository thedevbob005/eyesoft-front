import Vue from 'vue'
import './plugins/vuetify'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import VImageInput from 'vuetify-image-input'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
Vue.component(VImageInput.name, VImageInput)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
