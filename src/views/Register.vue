<template class="register">
  <v-layout align-center justify-center row fill-height>
    <v-flex xs10>
      <form>
        <v-text-field
          v-model="$v.nickName.$model"
          :counter="24"
          :error-messages="nickNameErrors"
          label="NickName"
          required
          @input="$v.nickName.$touch()"
          @blur="$v.nickName.$touch()">
        </v-text-field>

        <v-text-field
          v-model="$v.email.$model"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()">
        </v-text-field>

        <v-text-field
          v-model="$v.password.$model"
          :error-messages="passwordErrors"
          label="Password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()">
        </v-text-field>

        <v-text-field
          v-model="$v.rePassword.$model"
          :error-messages="rePasswordErrors"
          label="Repeat password"
          required
          @input="$v.rePassword.$touch()"
          @blur="$v.rePassword.$touch()">
        </v-text-field>

        <v-btn @click="submit">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
import { ADD_USER } from '../graphql'
import { validationMixin } from 'vuelidate'
import { required, email, maxLength, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  name: 'register',
  data () {
    return {
      nickName: '',
      email: '',
      password: '',
      rePassword: ''
    }
  },
  validations: {
    nickName: {
      required,
      maxLength: maxLength(10)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    rePassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  computed: {
    nickNameErrors () {
      const errors = []
      if (!this.$v.nickName.$dirty) return errors
      !this.$v.nickName.maxLength && errors.push('NickName must be at most 10 characters long')
      !this.$v.nickName.required && errors.push('NickName is required.')
      return errors
    },
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
    },
    rePasswordErrors () {
      const errors = []
      if (!this.$v.rePassword.$dirty) return errors
      !this.$v.rePassword.sameAsPassword && errors.push('Passwords must be identical.')
      return errors
    }
  },
  methods: {
    submit () {
      if (!this.$v.$invalid) {
        const { nickName, email, password } = this.$data
        this.$apollo.mutate({
          mutation: ADD_USER,
          variables: {
            name: nickName,
            email,
            password
          }
        }).then(res => {
          this.$router.push({ name: 'login' })
        })
      }
    },
    clear () {
      this.$v.$reset()
      this.nickName = ''
      this.email = ''
      this.password = ''
      this.rePassword = ''
    }
  }
}
</script>
