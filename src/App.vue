<template>
  <v-app id="hbaui">
    <v-navigation-drawer v-if="this.$store.state.isLoggedIn" v-model="drawer" fixed clipped app>
      <v-list dense>
        <v-layout row align-center>
          <v-flex xs12 align-center justify-center layout text-xs-center pt-5 pb-5>
            <v-avatar color="grey lighten-4" size="128">
              <img :src="this.$store.state.loginDP" alt="avatar">
            </v-avatar>
          </v-flex>
        </v-layout>
        <template v-for="(item, i) in items">
          <v-layout v-if="item.heading" :key="i" row align-center>
            <v-flex xs12>
              <v-subheader v-if="item.heading && item.permission">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
          </v-layout>
          <v-divider v-else-if="item.divider && item.permission" :key="i" class="my-3"></v-divider>
          <v-list-tile v-else-if="item.permission" :key="i" :to="item.to">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-list-tile @click="this.$store.commit('logout')">
          <v-list-tile-action>
            <v-icon>mdi-power</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Logout
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar v-if="this.$store.state.isLoggedIn" app absolute clipped-left class="elevation-0">
      <v-toolbar-side-icon @click="drawer = !drawer" class="mr-3"></v-toolbar-side-icon>
      <v-img :src="require('../src/assets/logo.png')" contain :max-width="48" lazy-src></v-img>
      <span class="title ml-3 mr-5">Eye<span class="font-weight-light">Soft</span></span>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content v-if="this.$store.state.isLoggedIn">
      <router-view/>
    </v-content>
    <v-content v-else>
      <v-container fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm6 md4 lg3 xl2 class="text-xs-center">
            <v-img :src="require('../src/assets/logo.png')" contain :max-height="120" lazy-src></v-img>
            <div class="title text-xs-center mb-5">Eye<span class="font-weight-light">Soft</span></div>
            <v-text-field prepend-icon="mdi-account-outline" label="Login" type="text" v-model="uname"></v-text-field>
            <v-text-field prepend-icon="mdi-lock-outline" label="Password" type="password" v-model="upass"></v-text-field>
            <v-btn color="primary" outline @click="login">Login</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      valid: true,
      drawer: null,
      uname: '',
      upass: '',
      items: [
        { icon: 'mdi-desktop-mac-dashboard', text: 'Dashboard', permission: parseInt(this.$store.state.permissions.per_all) },
        { divider: true, permission: parseInt(this.$store.state.permissions.per_users) },
        { heading: 'User', permission: parseInt(this.$store.state.permissions.per_users) },
        { icon: 'mdi-plus', text: 'Add User', to: 'createuser', permission: parseInt(this.$store.state.permissions.per_users) },
        { icon: 'mdi-account-details', text: 'List Users', to: 'listuser', permission: parseInt(this.$store.state.permissions.per_users) },
        { icon: 'mdi-account-key', text: 'Manage Permission', to: 'managepermissions', permission: parseInt(this.$store.state.permissions.per_users) },
        { divider: true, permission: parseInt(this.$store.state.permissions.per_accounts) || parseInt(this.$store.state.permissions.per_billing) },
        { heading: 'Accounts', permission: parseInt(this.$store.state.permissions.per_accounts) || parseInt(this.$store.state.permissions.per_billing) },
        { icon: 'mdi-finance', text: 'Journal', to: 'journal', permission: parseInt(this.$store.state.permissions.per_accounts) },
        { icon: 'mdi-finance', text: 'Trial Balance', permission: parseInt(this.$store.state.permissions.per_accounts) },
        { icon: 'mdi-finance', text: 'Balance Sheet', to: 'balancesheet', permission: parseInt(this.$store.state.permissions.per_accounts) },
        { icon: 'mdi-finance', text: 'Accounts Receivable', permission: parseInt(this.$store.state.permissions.per_accounts) },
        { icon: 'mdi-finance', text: 'Accounts Payable', permission: parseInt(this.$store.state.permissions.per_accounts) },
        { icon: 'mdi-finance', text: 'Purchase Order', permission: parseInt(this.$store.state.permissions.per_accounts) },
        { icon: 'mdi-finance', text: 'Inventory Management', to: 'inventorymanagement', permission: parseInt(this.$store.state.permissions.per_accounts) },
        { icon: 'mdi-receipt', text: 'Sales Order / Billing / Invoice', permission: parseInt(this.$store.state.permissions.per_billing) },
        { divider: true, permission: parseInt(this.$store.state.permissions.per_clients) },
        { heading: 'Client', permission: parseInt(this.$store.state.permissions.per_clients) },
        { icon: 'mdi-account-group', text: 'Profiles', permission: parseInt(this.$store.state.permissions.per_clients) },
        { icon: 'mdi-archive', text: 'Orders', permission: parseInt(this.$store.state.permissions.per_clients) },
        { icon: 'mdi-history', text: 'History', permission: parseInt(this.$store.state.permissions.per_clients) },
        { divider: true, permission: parseInt(this.$store.state.permissions.per_lab) },
        { heading: 'LAB', permission: parseInt(this.$store.state.permissions.per_lab) },
        { icon: 'mdi-microscope', text: 'Jobs', permission: parseInt(this.$store.state.permissions.per_lab) },
        { divider: true, permission: 1 },
        { icon: 'mdi-settings-outline', text: 'Settings', permission: parseInt(this.$store.state.permissions.per_all) }
      ]
    }
  },
  methods: {
    login: function () {
      var that = this
      this.axios({
        url: 'login',
        method: 'post',
        data: {
          uname: this.uname,
          upass: this.upass
        }
      }).then(function (response) {
        if (response.data.success) {
          that.$store.commit('login', {
            login: true,
            key: response.data.user.lkey,
            name: response.data.user.name,
            rank: response.data.user.rank,
            dp: response.data.user.dp,
            permissions: response.data.permissions
          })
        }
      })
    }
  }
}
</script>
