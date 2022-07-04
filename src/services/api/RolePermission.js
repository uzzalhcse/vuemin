import request from '@/services/network/request'
const prefix = '/auth'
export default {
  /*
  *
  * Roles
  *
  * */
  roles() {
    return request({
      url: `${prefix}/roles`,
      method: 'get'
    })
  },
  /*
  *
  * Users
  *
  * */
  users(query) {
    return request({
      url: `${prefix}/users?page=${query}`,
      method: 'get'
    })
  },
  userInfo(id) {
    return request({
      url: `${prefix}/users/${id}`,
      method: 'get'
    })
  },
  userAdd(data) {
    return request({
      url: `${prefix}/users`,
      method: 'post',
      data
    })
  },
  userUpdate(data, id) {
    return request({
      url: `${prefix}/users/${id}`,
      method: 'put',
      data
    })
  },
  userDelete(id) {
    return request({
      url: `${prefix}/users/${id}`,
      method: 'delete'
    })
  },
  /*
  *
  * Modules, Abilities Role and Permissions
  *
  * */
  allModules() {
    return request({
      url: `${prefix}/get-modules`,
      method: 'get'
    })
  },
  roleShow(id) {
    return request({
      url: `${prefix}/roles/${id}`,
      method: 'get'
    })
  },
  roleStore(data) {
    return request({
      url: `${prefix}/roles`,
      method: 'post',
      data
    })
  },
  roleUpdate(data, id) {
    return request({
      url: `${prefix}/roles/${id}`,
      method: 'put',
      data
    })
  },
  // rolePermissionsAdd(data) {
  //   return request({
  //     url: `${prefix}/role-permissions`,
  //     method: 'post',
  //     data
  //   })
  // },
  // rolePermissionsUpdate(data, id) {
  //   return request({
  //     url: `${prefix}/role-permissions/${id}`,
  //     method: 'put',
  //     data
  //   })
  // },
  /*
  *
  * Office
  *  */
  officeList() {
    return request({
      url: `${prefix}/offices`,
      method: 'get'
    })
  },

  officeInfo(id) {
    return request({
      url: `${prefix}/offices/${id}`,
      method: 'get'
    })
  },
  officeAdd(data) {
    return request({
      url: `${prefix}/offices`,
      method: 'post',
      data
    })
  },
  officeUpdate(data, id) {
    return request({
      url: `${prefix}/offices/${id}`,
      method: 'put',
      data
    })
  },
  officeDelete(id) {
    return request({
      url: `${prefix}/offices/${id}`,
      method: 'delete'
    })
  },
  officeTypes() {
    return request({
      url: `${prefix}/office-types`,
      method: 'get'
    })
  },
  officeJurisdictions() {
    return request({
      url: `${prefix}/jurisdictions`,
      method: 'get'
    })
  },
}
