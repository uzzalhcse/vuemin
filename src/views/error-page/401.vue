<template>
  <div class="error404 text-center">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 mr-auto mt-5 text-md-left text-center">
          <router-link :to="{ name: 'home'}" class="ml-md-5">
            <img alt="image-404" src="@/assets/img/cork-logo.png" class="theme-logo">
          </router-link>
        </div>
      </div>
    </div>
    <div class="container-fluid error-content">
      <div class="">
        <h1 class="error-number">401</h1>
        <p class="mini-text">UnAuthenticate</p>
        <p class="error-text mb-4 mt-1">The page you requested was not available!</p>
        <a class="btn btn-primary mt-5 cursor-pointer" @click="back">Go Back</a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Page401',
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/dashboard' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style scoped src="@/assets/css/pages/error/style-400.css">
</style>
