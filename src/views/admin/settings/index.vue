<template>
  <div class="layout-px-spacing">

    <div class="account-settings-container layout-top-spacing">

      <div class="account-content">
        <div class="scrollspy-example" data-spy="scroll" data-target="#account-settings-scroll" data-offset="-100">
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 layout-spacing">
              <form class="section general-info" @submit.prevent>
                <div class="info">
                  <div class="row">
                    <div class="col-6">
                      <h6 class="">General Information</h6>
                    </div>
                    <div class="col-6 text-right">
                      <button class="btn btn-primary" @click="saveProfile">Save</button>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-11 mx-auto">
                      <div class="row">
                        <div class="col-xl-2 col-lg-12 col-md-4">
                          <div class="upload mt-4 pr-md-4">
                            <el-upload
                              action=""
                              :auto-upload="false"
                              :show-file-list="false"
                              :on-change="handleChange">
                              <img v-if="avatar_url" class="upload-img" :src="avatar_url" alt="Upload">
                              <img v-else-if="auth.avatar" class="upload-img" :src="auth.avatar" alt="Upload">
                              <img v-else class="upload-img" src="@/assets/img/photo-upload.png" alt="Upload">
                            </el-upload>
<!--                            <input type="file" id="input-file-max-fs" class="dropify" data-default-file="@/assets/img/200x200.jpg" data-max-file-size="2M" />-->
                          </div>
                        </div>
                        <div class="col-xl-10 col-lg-12 col-md-8 mt-md-0 mt-4">
                          <div class="form">
                            <div class="row">
                              <div class="col-sm-6">
                                <div class="form-group">
                                  <label>Full Name</label>
                                  <input v-model="auth.name" type="text" class="form-control mb-4" placeholder="Full Name">
                                </div>
                              </div>
                              <div class="col-sm-6">
                                <div class="form-group">
                                  <label>Email</label>
                                  <input v-model="auth.email" type="email" class="form-control mb-4" placeholder="Email">
                                </div>
                              </div>
                            </div>
                            <div class="form-group">
                              <label>Office</label>
                              <select v-model="auth.office_id" class="form-control mb-4">
                                <option :value="null">Select Office</option>
                                <option v-for="office in offices" :key="office.id" :value="office.id">{{ office.name }}</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-xl-12 col-lg-12 col-md-12 layout-spacing">
              <form class="section general-info" @submit.prevent>
                <div class="info">
                  <div class="row">
                    <div class="col-6">
                      <h6 class="">Change Password</h6>
                    </div>
                    <div class="col-6 text-right">
                      <button class="btn btn-primary" @click="changePassword">Save</button>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-11 mx-auto">

                      <div class="work-section">
                        <div class="row">
                          <div class="col-md-12">
                            <div class="form-group">
                              <label>Old Password</label>
                              <input v-model="user.current_password" type="password" class="form-control mb-4" placeholder="****">
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <label>New Password</label>
                              <input v-model="user.new_password" type="password" class="form-control mb-4" placeholder="****">
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <label>Re Type New Password</label>
                              <input v-model="user.password_confirmation" type="password" class="form-control mb-4" placeholder="****">
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

import RolePermission from '@/services/api/RolePermission'
import { mapGetters } from 'vuex'
import Auth from '@/services/api/Auth'
export default {
  name: 'Settings',
  data() {
    return {
      offices: [],
      user: {
        current_password: null,
        new_password: null,
        password_confirmation: null
      },
      avatar_url: null
    }
  },
  computed: {
    ...mapGetters([
      'auth'
    ])
  },
  mounted() {
    this.getItems()
  },
  methods: {
    getItems() {
      RolePermission.officeList().then(res => {
        this.offices = res.data.offices
      })
    },
    saveProfile() {
      const formData = new FormData()
      formData.append('name', this.auth.name)
      if (this.auth.avatar_file) {
        formData.append('avatar_file', this.auth.avatar_file)
      }
      formData.append('email', this.auth.email)
      formData.append('office_id', this.auth.office_id)
      Auth.updateProfile(formData).then(res => {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: res.message
        })
        this.$store.dispatch('auth/getInfo')
      })
    },
    changePassword() {
      Auth.changePassword(this.user).then(res => {
        this.$notify({
          title: 'Success',
          type: 'success',
          message: res.message
        })
      })
    },
    handleChange(file, fileList) {
      this.auth.avatar_file = file.raw
      this.avatar_url = URL.createObjectURL(file.raw)
    }
  }
}
</script>

<style scoped src="@/assets/css/users/account-setting.css">
/*@import '@/assets/css/authentication/form-2.css';*/
</style>
