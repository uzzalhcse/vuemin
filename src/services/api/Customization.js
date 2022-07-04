import request from '@/services/network/request'
const prefix = '/customization'

export default {
  allPages() {
    return request({
      url: `${prefix}/pages`,
      method: 'get'
    })
  },
  savePages(data) {
    return request({
      url: `${prefix}/pages`,
      method: 'post',
      data
    })
  },
  uploadPageFile(data) {
    return request({
      url: `${prefix}/upload-page-files`,
      method: 'post',
      data
    })
  },
  allFaqs() {
    return request({
      url: `${prefix}/faqs`,
      method: 'get'
    })
  },
  FaqAdd(data) {
    return request({
      url: `${prefix}/faqs`,
      method: 'post',
      data
    })
  },
  faqDelete(id) {
    return request({
      url: `${prefix}/faqs/${id}`,
      method: 'delete'
    })
  },
  faqInfo(id) {
    return request({
      url: `${prefix}/faqs/${id}`,
      method: 'get'
    })
  },
  faqUpdate(data, id) {
    return request({
      url: `${prefix}/faqs/${id}`,
      method: 'put',
      data
    })
  }
}
