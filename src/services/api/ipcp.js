import request from '@/services/network/request'
const prefix = '/ipcp'

export default {
  caseTypeList(){
    return request({
      url: `${prefix}/case-types`,
      method: 'get'
    })
  },

  caseTypeInfo(id) {
    return request({
      url: `${prefix}/case-types/${id}`,
      method: 'get'
    })
  }
}
