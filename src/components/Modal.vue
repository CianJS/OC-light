<template class="modal">
  <v-layout row justify-center>
    <v-dialog
      v-model="openState"
      max-width="420">
      <v-card>
        <v-card-title class="headline" v-if="msg">
          {{ msg }}
        </v-card-title>
        <v-card-text v-if="detailMsg">
          {{ detailMsg }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="close">
            확인
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'modal',
  props: {
    msg: {
      required: false,
      type: String,
      default: ''
    },
    detailMsg: {
      required: false,
      type: String,
      default: ''
    },
    openState: {
      required: true,
      type: Boolean,
      default: false
    }
  },
  methods: {
    close () {
      this.$emit('closeModal')
    }
  }
}
</script>

<style>

</style>
