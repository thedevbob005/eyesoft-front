<template>
  <v-container fluid fill-height>
    <v-layout  align-center justify-center>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            Manage Permissions
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="ulist"
            :search="search"
          >
            <template v-slot:items="props">
              <td>{{ props.item.username }}</td>
              <td class="text-xs-center">{{ props.item.name }}</td>
              <td class="text-xs-center"><v-switch @change="updatePerCli(props.item.user_id, props.item.per_clients)" v-model="props.item.per_clients"></v-switch></td>
              <td class="text-xs-center"><v-switch @change="updatePerAcc(props.item.user_id, props.item.per_accounts)" v-model="props.item.per_accounts"></v-switch></td>
              <td class="text-xs-center"><v-switch @change="updatePerBil(props.item.user_id, props.item.per_billing)" v-model="props.item.per_billing"></v-switch></td>
              <td class="text-xs-center"><v-switch @change="updatePerLab(props.item.user_id, props.item.per_lab)" v-model="props.item.per_lab"></v-switch></td>
            </template>
            <v-alert v-slot:no-results :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      show2: false,
      headers: [
        { text: 'Username', align: 'left', value: 'username' },
        { text: 'Name', value: 'name' },
        { text: 'Client', value: 'per_clients' },
        { text: 'Account', value: 'per_accounts' },
        { text: 'Billing', value: 'per_billing' },
        { text: 'Lab', value: 'per_lab' }
      ],
      ulist: []
    }
  },
  mounted () {
    var that = this
    this.axios({
      url: 'userlist',
      method: 'post',
      data: {}
    }).then(function (response) {
      if (response.data.success) {
        that.ulist = response.data.ulist
        that.ulist.forEach(function (item, index) {
          that.ulist[index].per_clients = parseInt(that.ulist[index].per_clients)
          that.ulist[index].per_accounts = parseInt(that.ulist[index].per_accounts)
          that.ulist[index].per_billing = parseInt(that.ulist[index].per_billing)
          that.ulist[index].per_lab = parseInt(that.ulist[index].per_lab)
        })
      } else {
        alert(response.data.error)
      }
    })
  },
  methods: {
    updatePerCli: function (uid, val) {
      this.axios({
        url: 'percli',
        method: 'post',
        data: {
          user_id: uid,
          val: val ? 1 : 0
        }
      }).then(function (response) {
        if (response.data.success) {
          this.ulist = response.data.ulist
        } else {
          alert(response.data.error)
        }
      })
    },
    updatePerAcc: function (uid, val) {
      this.axios({
        url: 'peracc',
        method: 'post',
        data: {
          user_id: uid,
          val: val ? 1 : 0
        }
      }).then(function (response) {
        if (response.data.success) {
          this.ulist = response.data.ulist
        } else {
          alert(response.data.error)
        }
      })
    },
    updatePerBil: function (uid, val) {
      this.axios({
        url: 'perbil',
        method: 'post',
        data: {
          user_id: uid,
          val: val ? 1 : 0
        }
      }).then(function (response) {
        if (response.data.success) {
          this.ulist = response.data.ulist
        } else {
          alert(response.data.error)
        }
      })
    },
    updatePerLab: function (uid, val) {
      this.axios({
        url: 'perlab',
        method: 'post',
        data: {
          user_id: uid,
          val: val ? 1 : 0
        }
      }).then(function (response) {
        if (response.data.success) {
          this.ulist = response.data.ulist
        } else {
          alert(response.data.error)
        }
      })
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
