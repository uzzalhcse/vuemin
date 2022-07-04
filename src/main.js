import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import Vuelidate from 'vuelidate'
import VueFeather from '@/components/vue-feather'

import '@/utils/helper'
import '@/assets/css/bootstrap/bootstrap.min.css'
import '@/assets/css/plugins.css'
import '@/assets/css/scrollspyNav.css' // not required
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css'
import '@/assets/css/element-ui.css'
import '@/assets/css/style.css'

import 'bootstrap'
import './permission'

Vue.use(Element, { locale })
Vue.use(Vuelidate)
Vue.use(VueFeather)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
