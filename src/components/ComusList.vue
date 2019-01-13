<template>
  <div class="community">
    <v-list-tile
      v-if="comu"
      :key="comu.title">
      <v-list-tile-content>
        <v-list-tile-title>{{ comu.title }}</v-list-tile-title>
        <v-list-tile-sub-title>
          <v-list-tile-sub-title>{{ comu.mainGenre }}</v-list-tile-sub-title>
          <v-list-tile-sub-title>{{ comu.type }}</v-list-tile-sub-title>
        </v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  name: 'community',
  props: {
    index: Number,
    comu: Object
  },
  created () {
    switch (this.comu.type) {
      case 1:
        this.comu.type = '글'
        break
      case 2:
        this.comu.type = '그림 Only'
        break
      case 3:
        this.comu.type = '글&그림'
        break
    }
  }
}
</script>
