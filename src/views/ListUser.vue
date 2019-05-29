<template>
  <v-container fluid fill-height>
    <v-layout  align-center justify-center>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            User List
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
              <td class="text-xs-center">
                <v-text-field
                  :append-icon="show2 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                  :type="show2 ? 'text' : 'password'"
                  name="input-10-2"
                  label="Visible"
                  hint="At least 8 characters"
                  v-model="props.item.password"
                  class="input-group--focused"
                  @click:append="show2 = !show2"
                  readonly
                ></v-text-field>
              </td>
              <td class="text-xs-center">{{ props.item.name }}</td>
              <td class="text-xs-center">{{ props.item.rank }}</td>
              <td class="text-xs-center"><v-checkbox readonly v-model="props.item.per_clients"></v-checkbox></td>
              <td class="text-xs-center"><v-checkbox readonly v-model="props.item.per_accounts"></v-checkbox></td>
              <td class="text-xs-center"><v-checkbox readonly v-model="props.item.per_billing"></v-checkbox></td>
              <td class="text-xs-center"><v-checkbox readonly v-model="props.item.per_lab"></v-checkbox></td>
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
        { text: 'Password', value: 'password' },
        { text: 'Name', value: 'name' },
        { text: 'Rank / Position', value: 'rank' },
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
      } else {
        alert(response.data.error)
      }
    })
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
