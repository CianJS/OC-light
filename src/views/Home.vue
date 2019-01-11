<template>
  <div class="home">
    <ul>
      <users-list v-for="(user, index) in getAllUser" :key="index" :user="user"></users-list>
    </ul>
  </div>
</template>

<script>
import { GET_ALL_USER } from '../graphql/graphql'
import UsersList from '../components/UserList'

export default {
  name: 'home',
  data () {
    return {
      getAllUser: [],
      loading: 0
    }
  },
  components: {
    UsersList
  },
  apollo: {
    getAllUser: {
      query: GET_ALL_USER
    }
  }
}
</script>
