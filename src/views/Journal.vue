<template>
  <v-container fluid fill-height>
    <v-layout  align-center justify-center>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            Journal
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
            :items="alist"
            :search="search"
            disable-initial-sort
          >
            <template v-slot:items="props">
              <td>{{ props.item.entry_date }}</td>
              <td class="text-xs-center">{{ props.item.particulars }}</td>
              <td class="text-xs-center">{{ props.item.debit }}</td>
              <td class="text-xs-center">{{ props.item.credit }}</td>
            </template>
            <v-alert v-slot:no-results :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
            <template v-slot:footer>
              <td :colspan="headers.length - 2"></td>
              <td>{{ this.jTotalDebit }}</td>
              <td>{{ this.jTotalCredit }}</td>
            </template>
          </v-data-table>
        </v-card>
        <v-dialog
          v-model="dialog"
          width="500"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              absolute
              dark
              fab
              top
              right
            >
              <v-icon>add</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              Add entry
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="date"
                          label="Date"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="part" label="Particular*" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="dbt" type="number" label="Debit"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="cdt" type="number" label="Credit"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" flat @click="addJournal">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      dialog: false,
      show2: false,
      date: new Date().toISOString().substr(0, 10),
      part: '',
      dbt: 0,
      cdt: 0,
      menu2: false,
      headers: [
        { text: 'Date', align: 'left', value: 'entry_date' },
        { text: 'Particulars', value: 'particulars' },
        { text: 'Debit', value: 'debit' },
        { text: 'Credit', value: 'credit' }
      ],
      alist: []
    }
  },
  computed: {
    jTotalDebit: function () {
      let t = 0
      this.alist.forEach(function (item) {
        t += parseFloat(item.debit)
      })
      return t
    },
    jTotalCredit: function () {
      let t = 0
      this.alist.forEach(function (item) {
        t += parseFloat(item.credit)
      })
      return t
    }
  },
  mounted () {
    var that = this
    this.axios({
      url: 'journal',
      method: 'post',
      data: {}
    }).then(function (response) {
      if (response.data.success) {
        that.alist = response.data.journal
      } else {
        alert(response.data.error)
      }
    })
  },
  methods: {
    addJournal () {
      let that = this
      this.axios({
        url: 'journal/add',
        method: 'post',
        data: {
          date: this.date,
          particulars: this.part,
          debit: this.dbt,
          credit: this.cdt
        }
      }).then(function (response) {
        if (response.data.success) {
          that.alist = response.data.journal
        } else {
          alert(response.data.error)
        }
        that.dialog = false
        that.date = new Date().toISOString().substr(0, 10)
        that.part = ''
        that.dbt = 0
        that.cdt = 0
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
