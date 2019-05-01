<template class="user">
  <div class="text-xs-center">
    <v-flex xs8 offset-sm2>
      <v-img v-for="(item, i) in characters" :key="i" :src="item.characterLink[0]"></v-img>
      <!-- <v-img :src="`../../img/background-overlay.jpg`"></v-img> -->
      {{ username }}
      <img v-for="(item, i) in characters" :key="i" :src="item.characterLink[0]" />
    </v-flex>
    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
      <v-form ref="form">
        <img :src="imageUrl" height="150" v-if="imageUrl"/>
        <v-text-field
          label="Select Image" @click='pickFile' for="file"
          v-model='imageName' prepend-icon='attach_file'>
        </v-text-field>
        <input
          type="file"
          style="display: none"
          ref="image"
          accept="image/*"
          @change="onFilePicked">
      </v-form>
    </v-flex>
    <v-btn @click="upload">upload</v-btn>
  </div>
</template>

<script>
// 이미지 업로드 UI
// https://vuejsexamples.com/a-beautiful-vue-component-for-image-cropping-and-uploading/
import { GET_USER_CHARACTER, FileUpload } from '@/graphql'

export default {
  name: 'user',
  props: {
    userId: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      user: {
        userId: parseInt(this.userId)
      },
      userinfo: '',
      characters: '',
      dialog: false,
      imageName: '',
      imageUrl: '',
      imageFile: '',
      query: GET_USER_CHARACTER
    }
  },
  methods: {
    upload () {
      if (this.imageFile) {
        console.log(this.imageFile)
        this.$apollo.mutate({
          mutation: FileUpload,
          variables: {
            img: this.imageFile
          }
        }).then(res => {
          console.log(res, 'res')
        })
      } else {
        console.log('Please upload image file.')
      }
    },
    pickFile () {
      this.$refs.image.click()
    },
    onFilePicked (e) {
      const fd = new FormData()
      const file = e.target.files[0]

      if (file !== undefined) {
        this.imageName = file.name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        fd.append('image', file, file.name)
        console.log(JSON.stringify({}) === JSON.stringify(fd), file)
        this.imageFile = file
        this.imageUrl = URL.createObjectURL(file)
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    }
  },
  created () {
    // get user info
    this.$apollo.query({
      query: GET_USER_CHARACTER,
      variables: {
        userId: this.user.userId
      }
    }).then(({ data }) => {
      console.log(data.getMyInfo, 'seresrs')
      this.userinfo = data.getMyInfo.user
      this.characters = data.getMyInfo.characters
      console.log(this.characters)
    }).catch(err => {
      console.log(err.message, 'ereware')
    })
  }
}
</script>
