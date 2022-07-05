<template>
  <!--  BEGIN NAVBAR  -->
  <div class="header-container fixed-top">
    <header class="header navbar navbar-expand-sm">
      <a href="javascript:void(0);" class="sidebarCollapse" data-placement="bottom" @click="toggleSideBar"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></a>

<!--      <ul class="navbar-item flex-row">-->
<!--        <li class="nav-item align-self-center page-heading">-->
<!--          <div class="page-header">-->
<!--            <div class="page-title">-->
<!--              <h3>Layouts</h3>-->
<!--            </div>-->
<!--          </div>-->
<!--        </li>-->
<!--      </ul>-->
      <ul class="navbar-item flex-row search-ul">
        <li class="nav-item align-self-center search-animated">
          <feather type="search"></feather>
          <form class="form-inline search-full form-inline search" role="search">
            <div class="search-bar">
              <input type="text" class="form-control search-form-control  ml-lg-auto" placeholder="Search...">
            </div>
          </form>
        </li>
      </ul>
      <ul class="navbar-item flex-row navbar-dropdown">
        <li class="nav-item dropdown language-dropdown more-dropdown">
          <div class="dropdown  custom-dropdown-icon">
            <a class="dropdown-toggle btn" href="#" role="button" id="customDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="@/assets/img/flag-ca.svg" class="flag-width" alt="flag"><span>English</span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg></a>

            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="customDropdown">
              <a class="dropdown-item" data-img-value="flag-de" data-value="German" href="javascript:void(0);"><img src="@/assets/img/flag-de.svg" class="flag-width" alt="flag"> Bengali</a>
              <a class="dropdown-item" data-img-value="flag-sp" data-value="Spanish" href="javascript:void(0);"><img src="@/assets/img/flag-sp.svg" class="flag-width" alt="flag"> Hindi</a>
            </div>
          </div>
        </li>
        <li class="nav-item dropdown notification-dropdown">
          <a href="javascript:void(0);" class="nav-link dropdown-toggle" id="notificationDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <feather type="bell"></feather>
          </a>
          <div class="dropdown-menu position-absolute" aria-labelledby="notificationDropdown">
            <div class="notification-scroll">

              <div class="dropdown-item">
                <div class="media server-log">
                  <feather type="server"></feather>
                  <div class="media-body">
                    <div class="data-info">
                      <h6 class="">Server Rebooted</h6>
                      <p class="">45 min ago</p>
                    </div>

                    <div class="icon-status">
                      <feather type="x"></feather>
                    </div>
                  </div>
                </div>
              </div>

              <div class="dropdown-item">
                <div class="media file-upload">
                  <feather type="file-text"></feather>
                  <div class="media-body">
                    <div class="data-info">
                      <h6 class="">Kelly Portfolio.pdf</h6>
                      <p class="">670 kb</p>
                    </div>

                    <div class="icon-status">
                      <feather type="check"></feather>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>

        <li class="nav-item dropdown user-profile-dropdown  order-lg-0 order-1">
          <a href="javascript:void(0);" class="nav-link dropdown-toggle user" id="userProfileDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img v-if="auth.avatar" :src="auth.avatar" alt="avatar">
            <feather v-else type="user"></feather>
          </a>
          <div class="dropdown-menu position-absolute" aria-labelledby="userProfileDropdown">
            <div class="user-profile-section">
              <div class="media mx-auto">
                <img :src="auth.avatar" class="img-fluid mr-2" alt="avatar">
                <div class="media-body">
                  <h5>{{ auth.name }}</h5>
                  <p>{{auth.office ? auth.office.name : 'N/A'}}</p>
                </div>
              </div>
            </div>
            <div class="dropdown-item">
              <a href="javascript:void(0);" @click="$router.push({ name: 'Profile' })">
                <feather type="user"></feather>
                <span>Profile</span>
              </a>
            </div>
            <div class="dropdown-item">
              <a href="javascript:void(0);" @click="logout">
                <feather type="log-out"></feather>
                <span>Log Out</span>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </header>
  </div>
  <!--  END NAVBAR  -->
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters([
      'auth'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    async logout() {
      await this.$store.dispatch('auth/logout')
      await this.$router.push({ path: '/login' })
    }
  }
}
</script>

