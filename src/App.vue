<template>
  <v-app>
    <Header></Header>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from './views/Header'
import Footer from './views/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>
