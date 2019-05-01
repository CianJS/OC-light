<template class="mainHeader">
  <v-card>
    <v-toolbar flat dark dense>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">
          <v-btn class="main-title-btn-feature" to="/"></v-btn>
          Own-charater
        </span>
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
          <v-btn flat :to="`/users${userLink}`">{{ authAc }}</v-btn>
          <v-btn flat @click="logout">Logout</v-btn>
        </v-toolbar-items>
      </v-toolbar-items>
    </v-toolbar>

    <v-tabs centered dark slider-color="white">
      <v-tab>SF/판타지</v-tab>
      <v-tab>현대</v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
import { auth } from '../utils'
import { ReissuanceTokens } from '@/graphql'

export default {
  name: 'mainHeader',
  data () {
    return {
      activeState: true,
      authorized: false
    }
  },
  computed: {
    authAc () {
      return this.$root.$data.authLogin ? this.$root.$data.authLogin.username : null
    },
    userLink () {
      return `/${this.$root.$data.authLogin.userid}/${this.$root.$data.authLogin.username}`
    }
  },
  methods: {
    logout () {
      auth.logout()
      this.$root.$data.authLogin = undefined
    },
    async authLogged (token) {
      await auth.checkToken(token)
        .then(res => {
          this.$root.$data.authLogin = { userid: res.id, username: res.username }
        })
        .catch(err => {
          const errMsg = err.message
          const errResult = JSON.parse(errMsg)

          // refreshToken expired.
          if (errResult.refresh !== undefined) {
            this.$router.push({ name: 'home' })
            console.log('Expired refreshToken go to home')
            return
          }

          // Access token has expired and request reissue of token to server.
          if (errResult.access !== undefined) {
            this.$apollo.mutate({
              mutation: ReissuanceTokens,
              variables: {
                refreshToken: errResult.access
              }
            }).then(res => {
              const token = res.data.reissuanceToken

              auth.setCookie({ accessToken: token.accessToken, refreshToken: token.refreshToken })
              this.$root.$data.authLogin = { userid: token.id, username: token.username }
            }).catch(err => {
              console.log('TCL: created -> err', err)
            })
          }
        })
    }
  },
  created () {
    const token = auth.getTokenCookie()
    if (token) {
      // token check
      this.authLogged(token)
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 200px;
  opacity: 0;
  pointer-events: auto;
}

.font-weight-light {
  .main-title-btn-feature {
    @include overlay();
  }
}
</style>
