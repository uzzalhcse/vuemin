import request from '@/services/network/request'
export default {
  login(data) {
    return request({
      url: '/auth/login',
      method: 'post',
      data
    })
  },
  updateProfile(data) {
    return request({
      url: '/auth/update-profile',
      method: 'post',
      data
    })
  },
  dashboard(data) {
    return request({
      url: '/auth/dashboard',
      method: 'get'
    })
  },
  changePassword(data) {
    return request({
      url: '/auth/update-password',
      method: 'post',
      data
    })
  },
  getInfo() {
    return request({
      url: '/auth/info',
      method: 'get'
    })
  },
  logout() {
    return request({
      url: '/auth/logout',
      method: 'post'
    })
  }
}
