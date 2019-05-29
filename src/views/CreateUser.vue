<template>
  <v-container fluid fill-height>
    <v-layout  align-center justify-center>
      <v-flex xs12 sm8 md6 lg5 xl4>
        <v-image-input
          v-model="imageData"
          :image-quality="0.85"
          :image-height="128"
          :image-width="128"
          clearable
          full-width
          :readonly="reol"
          image-format="jpeg"
          overlay-border-width="2px"
          overlay-padding="30px"
          :overlay-background-color="reol ? ob : ot"
          :flip-horizontally-icon="icons.fliph"
          :flip-vertically-icon="icons.flipv"
          :flip-vertically-icon-style="null"
          :rotate-clockwise-icon="icons.rotate"
          :rotate-counterclockwise-icon="icons.rotate"
          :upload-icon="icons.upload"
        />
        <v-btn v-if="reolb" class="" @click="reol = !reol" icon :style="'margin-top: ' + (reol ? '-30px' : '-40px') + '; margin-right: 4px; float: right'"><v-icon>mdi-check</v-icon></v-btn>
        <v-form ref="createUserForm" v-model="valid" lazy-validation class="text-xs-center" v-on:submit.prevent="create">
          <v-text-field prepend-icon="mdi-account-outline" name="username" label="Login" type="text" v-model="uname"></v-text-field>
          <v-text-field prepend-icon="mdi-lock-outline" name="password" label="Password" type="password" v-model="upass"></v-text-field>
          <v-text-field prepend-icon="mdi-face" name="text" label="Name" type="text" v-model="name"></v-text-field>
          <v-text-field prepend-icon="mdi-podium" name="text" label="Rank / Post" type="text" v-model="rank"></v-text-field>
          <v-checkbox color="primary" v-model="checkbox1" label="Client Access"></v-checkbox>
          <v-checkbox color="primary" class="mt-0" v-model="checkbox2" label="Accounts Access"></v-checkbox>
          <v-checkbox color="primary" class="mt-0" v-model="checkbox3" label="Billing Access"></v-checkbox>
          <v-checkbox color="primary" class="mt-0" v-model="checkbox4" label="LAB Access"></v-checkbox>
          <v-btn color="primary" outline @click="create">Create Account</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    imageData: null,
    valid: false,
    ot: 'rgba(0,0,0,0.5)',
    ob: 'rgba(250,250,250,1)',
    uname: '',
    upass: '',
    name: '',
    rank: '',
    reol: false,
    reolb: false,
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    icons: {
      fliph: 'mdi-swap-horizontal',
      flipv: 'mdi-swap-vertical',
      rotate: 'mdi-format-rotate-90',
      upload: 'mdi-cloud-upload'
    }
  }),
  methods: {
    create: function () {
      this.axios({
        url: 'register',
        method: 'post',
        data: {
          uname: this.uname,
          upass: this.upass,
          name: this.name,
          rank: this.rank,
          dp: this.imageData ? this.imageData : '',
          per_accounts: this.checkbox2 ? 1 : 0,
          per_billing: this.checkbox3 ? 1 : 0,
          per_clients: this.checkbox1 ? 1 : 0,
          per_lab: this.checkbox4 ? 1 : 0
        }
      }).then(function (response) {
        if (response.data.success) {
          alert('User has been added')
        } else {
          alert(response.data.error)
        }
      })
    }
  },
  watch: {
    imageData: function (val) {
      this.reolb = (val != null)
      if (val == null) { this.reol = false }
    },
    reol: function (val) {
      if (val) { this.reolb = false }
    }
  }
}
</script>

<style scoped lang="stylus">
.text-title
  font-size 18px
  line-height 18px
  padding 16px
  text-align center
.text-eg
  display block
  font-size 48px
  line-height 92px
  color #ffffffee
  text-align center
</style>
