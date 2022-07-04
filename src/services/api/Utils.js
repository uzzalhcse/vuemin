import request from '@/services/network/request'
export default {
  getPages() {
    return request({
      url: '/pages',
      method: 'get'
    })
  },
  getFaqs() {
    return request({
      url: '/faqs',
      method: 'get'
    })
  },
  getStatuses() {
    return request({
      url: '/statuses',
      method: 'get'
    })
  },
  getDivisions() {
    return request({
      url: '/divisions',
      method: 'get'
    })
  },
  getDistricts(id) {
    return request({
      url: '/districts/' + id,
      method: 'get'
    })
  },
  getUpazilas(id) {
    return request({
      url: '/upazilas/' + id,
      method: 'get'
    })
  },
  getUnions(id) {
    return request({
      url: '/unions/' + id,
      method: 'get'
    })
  },
}
