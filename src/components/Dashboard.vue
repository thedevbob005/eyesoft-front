<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4>
        <v-card color="secondary" class="white--text">
          <div class="text-title">
            Clients
          </div>
          <v-divider light></v-divider>
          <div class="text-eg">1756</div>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-card color="secondary" class="white--text">
          <div class="text-title">
            New Clients
          </div>
          <v-divider light></v-divider>
          <div class="text-eg">1756</div>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-card color="secondary" class="white--text">
          <div class="text-title">
            Active Orders
          </div>
          <v-divider light></v-divider>
          <div class="text-eg">1756</div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader'
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify'
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify'
      }
    ],
    importantLinks: [
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com'
      },
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com'
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuetifyjs.com'
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs'
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify'
      }
    ],
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com/components/api-explorer'
      },
      {
        text: 'Select a layout',
        href: 'https://vuetifyjs.com/layout/pre-defined'
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions'
      }

    ]
  })
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
