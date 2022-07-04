import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/services/cookie/auth'
import { Loading } from 'element-ui'
let loadingUi = {}
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API + '/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 0 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    loadingUi = Loading.service({ fullscreen: true })
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    loadingUi = Loading.service({ fullscreen: true })
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

  /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
  response => {
    const res = response.data
    loadingUi.close()
    // if the custom code is not 200, it is judged as an error.
    let msg = 'Internal Server Error'
    if (res.code !== 200) {
      console.log('Message', res.code || 'Error')
      if (res.code === 401) {
        // to re-login
        msg = 'You have been logged out'
      }
      Message({
        message: res.message || msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || msg))
    } else {
      return res
    }
  },
  error => {
    loadingUi.close()
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default service
