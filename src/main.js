import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import Vuelidate from 'vuelidate'

import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
// import { ApolloLink } from 'apollo-link'

Vue.config.productionTip = false

Vue.use(VueApollo)
Vue.use(Vuelidate)

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/'
})

const defaultClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

let authLogin = localStorage.getItem('GC_USER_NAME')

new Vue({
  router,
  store,
  data: {
    authLogin
  },
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
