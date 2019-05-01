import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'vuetify/dist/vuetify.min.css'

import Vuelidate from 'vuelidate'

import VueApollo from 'vue-apollo'
import defaultClient from './apollo'

import { auth } from './utils'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueApollo)
Vue.use(Vuelidate)

const apolloProvider = new VueApollo({
  defaultClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

let authLogin = auth.getUserCookie()

new Vue({
  router,
  store,
  data: {
    authLogin
  },
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
