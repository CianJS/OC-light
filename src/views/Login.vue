<template class="login">
  <v-layout align-center justify-center row fill-height>
    <v-flex xs10>
      <form @keyup.enter="login">
        <v-text-field
          v-model="$v.email.$model"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()">
        </v-text-field>

        <v-text-field
          type="password"
          v-model="$v.password.$model"
          :error-messages="passwordErrors"
          label="Password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()">
        </v-text-field>
        <v-btn @click="login">submit</v-btn>
      </form>

      <Modal :detail-msg="detailMsg" :open-state="openState" @closeModal="modalStateChange"></Modal>
    </v-flex>
  </v-layout>
</template>

<script>
import { LOGIN_USER } from '../graphql'
import { auth } from '../utils'
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import { hashString } from '@/utils'

import { Modal } from '../components'

export default {
  mixins: [validationMixin],
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      openState: false,
      detailMsg: 'E-mail 또는 Password를 잘못입력하셨습니다.'
    }
  },
  components: {
    Modal
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      !this.$v.email.email && errors.push('E-mail is not format')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      return errors
    }
  },
  methods: {
    login () {
      if (!this.$v.$invalid) {
        this.$apollo.mutate({
          mutation: LOGIN_USER,
          variables: {
            email: this.email,
            pw: hashString(this.password).digest
          }
        }).then(res => {
          const data = res.data.loginUser[0]
          if (data) {
            this.$router.push({ name: 'home' })
            auth.setCookie(data)
            this.$root.$data.authLogin = { userid: data.user.id, username: data.user.username }
          } else {
            this.modalStateChange()
          }
        }).catch(e => {
          console.log('Login FAIL:', e)
          this.modalStateChange()
        })
      } else {
        this.$v.email.$touch()
        this.$v.password.$touch()
      }
    },
    modalStateChange () {
      this.openState = !this.openState
    }
  }
}
</script>
