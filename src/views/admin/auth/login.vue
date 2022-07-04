<template>
  <div class="form-container outer">
    <div class="form-form">
      <div class="form-form-wrap">
        <div class="form-container">
          <div class="form-content">

            <h1 class="">Sign In</h1>
            <p class="">Log in to your account to continue.</p>

            <form class="text-left" @submit.prevent="onSubmit">
              <div class="form">

                <div id="username-field" class="field-wrapper input">
                  <label for="email">Email</label>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  <input id="email" ref="email" v-model="loginForm.email" name="email" type="text" class="form-control" placeholder="Email">
                </div>

                <div id="password-field" class="field-wrapper input mb-2">
                  <div class="d-flex justify-content-between">
                    <label for="password">PASSWORD</label>
                    <a href="" class="forgot-pass-link" @click.stop.prevent>Forgot Password?</a>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  <input id="password" ref="password" v-model="loginForm.password" name="password" type="password" class="form-control" placeholder="Password">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" id="toggle-password" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </div>
                <div class="d-sm-flex justify-content-between">
                  <div class="field-wrapper">
                    <button type="submit" class="btn btn-primary" value="">Log In</button>
                  </div>
                </div>

<!--                <p class="signup-link">Not registered ? <a href="javascript:">Create an account</a></p>-->

              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        email: 'superadmin@gmail.com',
        password: 'password'
      },
      passwordType: 'password',
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
  },
  mounted() {
    if (this.loginForm.email === '') {
      this.$refs.email.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    onSubmit(event) {
      console.log('Form Submitting')
      this.handleLogin()
    },
    handleLogin() {
      this.$store.dispatch('auth/login', this.loginForm)
        .then(() => {
          this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
        })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style scoped src="@/assets/css/authentication/form-2.css"></style>
