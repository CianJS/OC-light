<template>
  <div class="test">
    <ul>
      <li>
        name: {{ user.name }}
        email: {{ user.email }}
        pw: {{ user.pw }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'test',
  props: [
    'user'
  ]
}
</script>

<style scoped>

</style>
