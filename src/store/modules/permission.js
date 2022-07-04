import { asyncRoutes, publicRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param slugs
 * @param route
 */
function hasPermission(slugs, route) {
  if (route.meta && route.meta.module) { // check if it's a module then match with only module slug
    return slugs.some(slug => route.meta.module.includes(slug.split('.').shift()))
  } else if (route.meta && route.meta.slugs) { // check if it has acl then match with only slug
    return slugs.some(slug => route.meta.slugs.includes(slug))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param slugs
 */
export function filterAsyncRoutes(routes, slugs) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(slugs, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, slugs)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = publicRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, acl) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, acl)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
