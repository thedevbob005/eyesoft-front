<template>
  <v-container fluid fill-height>
    <v-layout  align-center justify-center>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            Sales Order
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
              <td>{{ props.item.sales_id }}</td>
              <td class="text-xs-center">{{ props.item.sales_date }}</td>
              <td class="text-xs-center">{{ props.item.name }}</td>
              <td class="text-xs-center">{{ props.item.amount }}</td>
              <td class="text-xs-center">{{ props.item.status }}</td>
              <td class="text-xs-center">
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      xs
                      v-on="on"
                    >
                      Update Status
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-tile @click="updateStatus(props.item.sales_id, 'Ordered')">
                      <v-list-tile-title>Ordered</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="updateStatus(props.item.sales_id, 'Processing')">
                      <v-list-tile-title>Processing</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="updateStatus(props.item.sales_id, 'Ready')">
                      <v-list-tile-title>Ready</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="updateStatus(props.item.sales_id, 'Complete')">
                      <v-list-tile-title>Complete</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-btn xs target="_blank" :href="'/bill/'+props.item.sales_id">Print</v-btn>
              </td>
            </template>
            <v-alert v-slot:no-results :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
        </v-card>
        <v-dialog
          v-model="dialog"
          fullscreen hide-overlay transition="dialog-bottom-transition"
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
                  <v-flex xs12 md4>
                    <v-text-field v-model="soName" label="Customer Name*" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-text-field v-model="soAddress" label="Customer Address"></v-text-field>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-text-field v-model="soPhone" label="Customer Phone"></v-text-field>
                  </v-flex>
                  <template v-for="item in soItems">
                    <v-flex xs12 md4 v-bind:key="item">
                      <v-combobox
                        v-model="item.iid"
                        :items="invlist"
                        item-text="item_name"
                        item-value="item_id"
                        label="Type and choose an Item"
                      ></v-combobox>
                    </v-flex>
                    <v-flex xs12 md4 v-bind:key="item">
                      <v-text-field v-model="item.imrp" type="number" label="MRP" readonly></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4 v-bind:key="item">
                      <v-text-field v-model="item.iqty" type="number" label="Qty"></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4 v-bind:key="item">
                      <v-text-field v-model="item.iprice" type="number" label="Price"></v-text-field>
                    </v-flex>
                  </template>
                  <v-flex xs12>
                    <v-btn>Add</v-btn>
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
      invlist: [],
      soName: '',
      soAddress: '',
      soPhone: '',
      soItems: [{
        iid: '',
        imrp: '',
        iqty: 0,
        iprice: 0
      }],
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
