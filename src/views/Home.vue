<template>
  <div class="home">
    <Carousel></Carousel>
    <v-flex xs12>
      <v-list two-line>
        <comu-lists
          v-for="(comu, index) in getComu"
          :key="index"
          :index="index"
          :comu="comu">
        </comu-lists>
      </v-list>
    </v-flex>
  </div>
</template>

<script>
import { GET_COMMUNITY } from '../graphql'
import { Carousel, ComuLists } from '../components'

export default {
  name: 'home',
  data () {
    return {
      getComu: [],
      loading: 0
    }
  },
  components: {
    ComuLists,
    Carousel
  },
  apollo: {
    getComu: {
      query: GET_COMMUNITY
    }
  }
}
</script>
