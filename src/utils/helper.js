import Vue from 'vue'
import store from '@/store'

Vue.mixin({
  methods: {
    can: permission => store.getters.acl.includes(permission)
  }
})
