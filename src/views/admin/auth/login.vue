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
                  <feather type="user"></feather>
                  <input id="email" ref="email" v-model="loginForm.email" name="email" type="text" class="form-control" placeholder="Email">
                </div>

                <div id="password-field" class="field-wrapper input mb-2">
                  <div class="d-flex justify-content-between">
                    <label for="password">PASSWORD</label>
                    <a href="" class="forgot-pass-link" @click.stop.prevent>Forgot Password?</a>
                  </div>
                  <feather type="lock"></feather>
                  <input id="password" ref="password" v-model="loginForm.password" name="password" type="password" class="form-control" placeholder="Password">
                  <feather type="eye"></feather>
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

<style src="@/assets/css/authentication/form-2.css"></style>
