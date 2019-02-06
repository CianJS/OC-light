import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import Vuelidate from 'vuelidate'

import VueApollo from 'vue-apollo'
import defaultClient from './apollo'

Vue.config.productionTip = false

Vue.use(VueApollo)
Vue.use(Vuelidate)

const apolloProvider = new VueApollo({
  defaultClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

let authLogin
new Vue({
  router,
  store,
  data: {
    authLogin
  },
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
