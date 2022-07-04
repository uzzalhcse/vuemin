<template>
  <div class="app-wrapper">
    <navbar />
    <div id="container" :class="classObj" class="main-container">
      <sidebar />
      <!--  BEGIN CONTENT AREA  -->
      <div id="content" class="main-content" @click="handleClickOutside">
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import AppMain from './AppMain'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain,
    Sidebar
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device
    }),
    classObj() {
      return {
        'sbar-open': !this.sidebar.opened,
        // 'sidebar-closed': !this.sidebar.opened && this.device !== 'mobile',
        mobile: this.device === 'mobile' && !this.sidebar.opened
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

