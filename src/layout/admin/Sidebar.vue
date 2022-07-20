<template>

  <!--  BEGIN SIDEBAR  -->
  <div class="sidebar-wrapper sidebar-theme">

    <nav id="sidebar">

      <ul class="navbar-nav theme-brand flex-row  text-center">
        <li class="nav-item theme-text">
          <a href="" class="nav-link"> VueMin </a>
        </li>
        <li class="nav-item toggle-sidebar" @click="toggleSideBar">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather sidebarCollapse feather-chevrons-left"><polyline points="11 17 6 12 11 7" /><polyline points="18 17 13 12 18 7" /></svg>
        </li>
      </ul>

      <div class="shadow-bottom" />
      <ul id="accordionExample" class="list-unstyled menu-categories">
        <!--        <li class="menu menu-heading">-->
        <!--          <div class="heading"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg><span>APPS</span></div>-->
        <!--        </li>-->
        <sidebar-item v-for="(route, index) in permission_routes" :key="route.path" :index="index" :item="route" :base-path="route.path" />

      </ul>

    </nav>

  </div>
  <!--  END SIDEBAR  -->

</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar'
import { scrollCat } from '@/utils/scroll-to'
import { mapGetters } from 'vuex'
import { publicRoutes } from '@/router'
import SidebarItem from './SidebarItem'
export default {
  name: 'Layout',
  components: {
    SidebarItem
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ]),
    currentModule() {
      const routeName = this.$route.name
      return this.permission_routes.find(module => {
        if ((!module.hidden && module.meta) || module.sidebarVisible) {
          if (module.children.length) {
            const children = module.children.find(children => children.name === routeName)
            if (children) {
              return module
            }
          }
          // console.log(module.name)
          // console.log('routeName', routeName)
          // return module.name === routeName
          // return {}
        }
      })
    },
    publicRoutes() {
      return publicRoutes
    }
  },
  mounted() {
    new PerfectScrollbar('.menu-categories', {
      wheelSpeed: 0.5,
      swipeEasing: !0,
      minScrollbarLength: 40,
      maxScrollbarLength: 300
    })
    scrollCat()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

