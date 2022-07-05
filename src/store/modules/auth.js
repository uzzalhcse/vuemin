import Auth from '@/services/api/Auth'
import { getToken, setToken, removeToken } from '@/services/cookie/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  email: '',
  roles: [],
  office: { },
  info: {},
  acl: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_OFFICE: (state, office) => {
    state.office = office
  },
  SET_ACL: (state, acl) => {
    state.acl = acl
  },
  SET_INFO: (state, info) => {
    state.info = info
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, credentials) {
    const { email, password } = credentials
    return new Promise((resolve, reject) => {
      Auth.login({ email: email.trim(), password: password }).then(response => {
        const { data } = response
        const token = data.token_type + ' ' + data.access_token
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      Auth.getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { acl, roles, office } = data.user
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        if (acl.length <= 0) {
          reject("You don't have any permissions!")
        }

        commit('SET_ROLES', roles)
        commit('SET_ACL', acl)
        commit('SET_OFFICE', office)
        commit('SET_INFO', data.user)
        resolve(data.user)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      Auth.logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_ACL', [])
        commit('SET_OFFICE', { })
        commit('SET_INFO', {})
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ACL', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
