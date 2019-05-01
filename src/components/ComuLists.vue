<template>
  <v-layout row wrap class="comult">
    <v-flex v-bind="{ [`xs6`]: true }">
      <v-card>
        <v-list-tile
          v-if="comu"
          :key="comu.title"
          ripple
          @click="letsCommunity(comu)">
          <v-list-tile-content>
            <v-list-tile-title>{{ comu.title }}</v-list-tile-title>
            <v-list-tile-sub-title>
              <v-list-tile-sub-title>{{ comu.mainGenre }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>{{ comu.type }}</v-list-tile-sub-title>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-card>
    </v-flex>
    <v-flex v-bind="{ [`xs6`]: true }">
      <v-card>
        <v-list-tile
          v-if="comu"
          :key="comu.title"
          ripple
          @click="letsCommunity(comu)">
          <v-list-tile-content>
            <v-list-tile-title>{{ comu.title }}</v-list-tile-title>
            <v-list-tile-sub-title>
              <v-list-tile-sub-title>{{ comu.mainGenre }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>{{ comu.type }}</v-list-tile-sub-title>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'comult',
  props: {
    index: Number,
    comu: Object
  },
  methods: {
    letsCommunity (comu) {
      this.$router.push({ name: 'community', params: { comuId: comu.id, comu } })
    }
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
