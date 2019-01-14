<template class="community">
  <p v-if="comuInfo">
    커뮤니티명: {{ comuInfo.title }}
    장르: {{ comuInfo.mainGenre }}
  </p>
  <p v-else>해당되는 커뮤니티가 존재하지 않습니다.</p>
</template>

<script>
export default {
  name: 'community',
  data () {
    return {
      comuInfo: Object
    }
  },
  mounted () {
    this.comuInfo = this.$route.params.comu
  }
}
</script>
