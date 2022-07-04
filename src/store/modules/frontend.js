import Utils from '@/services/api/Utils'

const state = {
  home_page: {},
  payment_page: {},
  development_page: {},
  faq_page: {},
  all_pages: null
}

const mutations = {
  SET_PAGE: (state, content) => {
    state.home_page = content.home_page
    state.payment_page = content.payment_page
    state.development_page = content.development_page
    state.faq_page = content.faq_page
    state.all_pages = content
  }
}

const actions = {
  setPageContent({ commit }) {
    return new Promise((resolve, reject) => {
      Utils.getPages().then(response => {
        const { pages } = response.data
        commit('SET_PAGE', pages)
        resolve(pages)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
