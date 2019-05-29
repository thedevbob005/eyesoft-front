<template>
  <v-container fluid fill-height>
    <v-layout  align-center justify-center>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            Inventory
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
              <td>{{ props.item.item_name }}</td>
              <td class="text-xs-center">{{ props.item.item_code }}</td>
              <td class="text-xs-center">{{ props.item.mrp }}</td>
              <td class="text-xs-center">{{ props.item.qty }} <v-btn sm @click="updateDialog(props.item.item_id, props.item.item_name, props.item.item_code)">Update</v-btn></td>
            </template>
            <v-alert v-slot:no-results :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
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
              Add Item
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field v-model="iname" label="Item Name*" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="icode" label="Item Code*" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="mrp" type="number" label="MRP" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="qty" type="number" label="Quantity" required></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" flat @click="addItem">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="dialog2"
          width="500"
        >
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              Update Quantity
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field v-model="updateName" label="Item Name" readonly></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="updateCode" label="Item Code" readonly></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="updateQty" type="number" label="Quantity*" required></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialog2 = false">Close</v-btn>
              <v-btn color="blue darken-1" flat @click="updateItemAdd">Add Quantity</v-btn>
              <v-btn color="blue darken-1" flat @click="updateItemSet">Set Quantity</v-btn>
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
      iname: '',
      icode: '',
      mrp: 0,
      qty: 0,
      updateId: '',
      updateName: '',
      updateCode: '',
      updateQty: '',
      menu2: false,
      headers: [
        { text: 'Item', align: 'left', value: 'item_name' },
        { text: 'Item Code', value: 'item_code' },
        { text: 'MRP', value: 'mrp' },
        { text: 'Quantity', value: 'qty' }
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
      url: 'inventory',
      method: 'post',
      data: {}
    }).then(function (response) {
      if (response.data.success) {
        that.alist = response.data.inventory
      } else {
        alert(response.data.error)
      }
    })
  },
  methods: {
    addItem () {
      let that = this
      this.axios({
        url: 'inventory/add',
        method: 'post',
        data: {
          name: this.iname,
          code: this.icode,
          mrp: this.mrp,
          qty: this.qty
        }
      }).then(function (response) {
        if (response.data.success) {
          that.alist = response.data.inventory
        } else {
          alert(response.data.error)
        }
        that.dialog = false
        that.iname = ''
        that.icode = ''
        that.mrp = 0
        that.qty = 0
      })
    },
    updateItemAdd () {
      let that = this
      this.axios({
        url: 'inventory/update/add',
        method: 'post',
        data: {
          item: this.updateId,
          qty: this.updateQty
        }
      }).then(function (response) {
        if (response.data.success) {
          that.alist = response.data.inventory
        } else {
          alert(response.data.error)
        }
        that.dialog2 = false
        that.updateName = ''
        that.updateCode = ''
        that.updateQty = 0
      })
    },
    updateItemSet () {
      let that = this
      this.axios({
        url: 'inventory/update/set',
        method: 'post',
        data: {
          item: this.updateId,
          qty: this.updateQty
        }
      }).then(function (response) {
        if (response.data.success) {
          that.alist = response.data.inventory
        } else {
          alert(response.data.error)
        }
        that.dialog2 = false
        that.updateName = ''
        that.updateCode = ''
        that.updateQty = 0
      })
    },
    updateDialog (id, name, code) {
      this.updateId = id
      this.updateName = name
      this.updateCode = code
      this.dialog = !this.dialog
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
