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
export default {
  name: 'mainHeader',
  computed: {
    authAc () {
      return this.$root.$data.authLogin
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('GC_USER_NAME')
      this.$root.$data.authLogin = localStorage.getItem('GC_USER_NAME')
    }
  }
}
</script>
