<template class="mainHeader">
  <v-toolbar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>Test</span>
      <span class="font-weight-light">Own-charater</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/">Home</v-btn>
      <v-btn flat to="/about">About</v-btn>
      <v-toolbar-items v-if="!authAc">
        <v-btn flat to="/login">Login</v-btn>
        <v-btn flat to="/register">Register</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else>
        <v-btn flat>{{ authAc }}</v-btn>
        <v-btn flat @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { auth } from '../utils'
import { ReissuanceTokens } from '@/graphql'

export default {
  name: 'mainHeader',
  data () {
    return {
      authorized: false
    }
  },
  computed: {
    authAc () {
      return this.$root.$data.authLogin
    }
  },
  methods: {
    logout () {
      auth.logout()
      this.$root.$data.authLogin = undefined
    }
  },
  created () {
    const token = auth.getCookie()
    if (token) {
      auth.checkToken(token)
        .then(res => {
          this.$root.$data.authLogin = res.username
        })
        .catch(err => {
          const errMsg = err.message
          const errResult = JSON.parse(errMsg)

          // refreshToken expired.
          if (errResult.refresh !== undefined) {
            this.$router.push({ name: 'home' })
            return
          }

          if (errResult.access !== undefined) {
            this.$apollo.mutate({
              mutation: ReissuanceTokens,
              variables: {
                refreshToken: errResult.access
              }
            }).then(res => {
              const token = res.data.reissuanceToken

              auth.setCookie({ accessToken: token.accessToken, refreshToken: token.refreshToken })
              this.$root.$data.authLogin = token.username
            }).catch(err => {
              console.log('TCL: created -> err', err)
            })
          }
        })
    }
  }
}
</script>
