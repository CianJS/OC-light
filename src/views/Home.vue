<template>
  <div class="home">
    <v-flex xs12>
      <v-list two-line>
        <comus-list
          v-for="(comu, index) in getComu"
          :key="index"
          :index="index"
          :comu="comu">
        </comus-list>
      </v-list>
    </v-flex>
  </div>
</template>

<script>
import { GET_COMMUNITY } from '../graphql'
import ComusList from '../components/ComusList'

export default {
  name: 'home',
  data () {
    return {
      getComu: [],
      loading: 0
    }
  },
  components: {
    ComusList
  },
  apollo: {
    getComu: {
      query: GET_COMMUNITY
    }
  }
}
</script>
