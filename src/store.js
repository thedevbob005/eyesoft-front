import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    loginKey: localStorage.getItem('wxszlwehvb') || null,
    loginName: localStorage.getItem('ctjdmficaw') || 'Unknown',
    loginRank: localStorage.getItem('zulymqylud') || 'Unknown',
    loginDP: localStorage.getItem('xhpjrmmbtg') || 'https://ui-avatars.com/api/?size=256&name=Unknown',
    permissions: localStorage.getItem('jhhpjrmktg') ? JSON.parse(localStorage.getItem('jhhpjrmktg')) : JSON.parse('{ "per_all":1, "per_users":0, "per_accounts":0, "per_billing":0, "per_clients":0, "per_lab":0 }')
  },
  mutations: {
    login: (state, payload) => {
      state.isLoggedIn = payload.login
      if (payload.login) {
        state.loginKey = payload.key
        localStorage.setItem('wxszlwehvb', payload.key)
        state.loginName = payload.name
        localStorage.setItem('ctjdmficaw', payload.name)
        state.loginRank = payload.rank
        localStorage.setItem('zulymqylud', payload.rank)
        if (payload.dp != null && payload.dp !== 'null' && payload.dp !== '') {
          state.loginDP = payload.dp
          localStorage.setItem('zulymqylud', payload.dp)
        } else {
          localStorage.setItem('zulymqylud', 'https://ui-avatars.com/api/?size=256&name=' + payload.name.replace(' ', '+'))
          state.loginDP = 'https://ui-avatars.com/api/?size=256&name=' + payload.name.replace(' ', '+')
        }
        var perm = {
          per_all: parseInt(payload.permissions.per_all),
          per_users: parseInt(payload.permissions.per_users),
          per_accounts: parseInt(payload.permissions.per_accounts),
          per_billing: parseInt(payload.permissions.per_billing),
          per_clients: parseInt(payload.permissions.per_clients),
          per_lab: parseInt(payload.permissions.per_lab)
        }
        state.permissions = perm
        localStorage.setItem('jhhpjrmktg', JSON.stringify(state.permissions))
      }
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.loginKey = null
      localStorage.removeItem('wxszlwehvb')
      state.loginName = 'Unknown'
      localStorage.removeItem('ctjdmficaw')
      state.loginRank = 'Unknown'
      localStorage.removeItem('zulymqylud')
      state.loginDP = 'https://ui-avatars.com/api/?size=256&name=Unknown'
      localStorage.removeItem('zulymqylud')
      state.permissions = JSON.parse('{ "per_all":1, "per_users":0, "per_accounts":0, "per_billing":0, "per_clients":0, "per_lab":0 }')
      localStorage.removeItem('jhhpjrmktg')
    }
  },
  actions: {

  }
})
