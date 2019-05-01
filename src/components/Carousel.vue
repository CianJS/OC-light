<template>
  <v-carousel hide-controls height=320>
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item">
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data () {
    return {
      items: [1, 2, 3, 4, 5]
    }
  }
}
</script>
