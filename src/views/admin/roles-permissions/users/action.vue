<template>
  <div class="layout-px-spacing">
    <!-- CONTENT AREA -->
    <div class="row layout-top-spacing">

      <div class="col-12 layout-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-header">
            <div class="row" style="padding: 10px 15px">
              <div class="col-6">
                <h2 class="mt-1">{{ isEditMode ? 'Edit' : 'Add' }} User</h2>
              </div>
              <div class="col-6 text-right">
                <button type="button" class="btn btn-primary mt-3 mr-3" @click="isEditMode ? handleUpdateAction() : handleCreateAction()">{{ isEditMode ? 'Update' : 'Save' }}</button>
                <button type="button" class="btn btn-danger mt-3" @click="$router.go(-1)">Cancel</button>
              </div>
            </div>
          </div>
          <form class="widget-content widget-content-area">
            <!--              {{item}}-->
            <div class="form-row">
              <div class="form-group col-6">
                <label for="name">Name</label>
                <input id="name" v-model="$v.item.name.$model" type="text" class="form-control" placeholder="Please Enter User Name" :class="($v.item.name.$anyError || !$v.item.name.required) ? 'border-danger' : 'border-none'">
                <p class="error" v-if="!$v.item.name.required">Name field is required</p>
              </div>
              <div class="form-group col-6">
                <label for="email">Email</label>
                <input id="email" v-model="$v.item.email.$model" type="email" class="form-control" placeholder="Please Enter User Email" :class="($v.item.email.$anyError || !$v.item.email.required) ? 'border-danger' : 'border-none'">
                <p class="error" v-if="!$v.item.email.required">Email field is required</p>
                <p class="error" v-if="!$v.item.email.email">Invalid email address.</p>
              </div>
            </div>
            <div v-if="!isEditMode" class="form-row">
              <div class="form-group col-6">
                <label for="password">Password</label>
                <input id="password" v-model="$v.item.password.$model" type="password" class="form-control" placeholder="Please Enter Password" :class="($v.item.password.$anyError || !$v.item.password.required) ? 'border-danger' : 'border-none'">
                <p class="error" v-if="!$v.item.password.required">Password field is required</p>
                <p class="error" v-if="!$v.item.password.minLength">Password at least 6 character.</p>
              </div>
              <div class="form-group col-6">
                <label for="confirm_password">Confirm Password</label>
                <input id="confirm_password" v-model="$v.item.password_confirmation.$model" type="password" class="form-control" placeholder="Enter Confirm Password" :class="($v.item.password_confirmation.$anyError || !$v.item.password_confirmation.sameAsPassword) ? 'border-danger' : 'border-none'">
                <p class="error" v-if="!$v.item.password_confirmation.sameAsPassword">Passwords must be identical</p>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-6">
                <label for="status">Status</label>
                <select id="status" v-model="$v.item.status_id.$model" class="form-control" :class="($v.item.status_id.$anyError || !$v.item.status_id.required) ? 'border-danger' : 'border-none'">
                  <option value="null">Choose...</option>
                  <option v-for="item in status" :key="item.value" :value="item.value">{{ item.name }}</option>
                </select>
                <p class="error" v-if="!$v.item.status_id.required">Status field is required</p>
              </div>
              <div class="form-group col-6">
                <label>Role</label>
                <el-select
                    v-model="$v.item.role_ids.$model"
                    multiple
                    filterable
                    collapse-tags
                    class="el-form-control"
                    placeholder="Select">
                  <el-option
                      v-for="role in roles"
                      :key="role.id"
                      :label="role.name"
                      :value="role.id">
                  </el-option>
                </el-select>
                <p v-if="!$v.item.role_ids.required" class="error">Role is required</p>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-6">
                <label for="office">Office</label>
                <select id="office" v-model="$v.item.office_id.$model" class="form-control" :class="($v.item.office_id.$anyError || !$v.item.office_id.required) ? 'border-danger' : 'border-none'">
                  <option value="null">Choose...</option>
                  <option v-for="office in offices" :key="office.value" :value="office.id">{{ office.name }}</option>
                </select>
                <p v-if="!$v.item.office_id.required" class="error">Office field is required</p>
              </div>
            </div>
          </form>
          <acl-form :modules="modules" @togglePermission="togglePermission"/>
        </div>
      </div>
    </div>
    <!-- CONTENT AREA -->
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import RolePermission from '@/services/api/RolePermission'
import AclForm from '@/components/AclForm'

export default {
  name: 'UserAction',
  components: {
    AclForm
  },
  data() {
    return {
      loading: false,
      roles: null,
      item: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        status_id: 1,
        office_id: null,
        permissions: [],
        role_ids: null
      },
      offices: [],
      modules: [],
      status: [
        {
          name: 'Active',
          value: 1
        },
        {
          name: 'InActive',
          value: 0
        }
      ]
    }
  },
  validations() {
    if (!this.isEditMode) {
      return {
        item: {
          name: {
            required
          },
          email: {
            required,
            email
          },
          status_id: {
            required
          },
          office_id: {
            required
          },
          role_ids: {
            required
          },
          password: {
            required,
            minLength: minLength(6)
          },
          password_confirmation: {
            sameAsPassword: sameAs('password')
          }
        }
      }
    } else {
      return {
        item: {
          name: {
            required
          },
          email: {
            required,
            email
          },
          office_id: {
            required
          },
          status_id: {
            required
          },
          role_ids: {
            required
          }
        }
      }
    }
  },
  computed: {
    isEditMode() {
      return this.$route.params && this.$route.params.id
    }
  },
  created() {
    this.getRoles()
    this.getOffices()
  },
  mounted() {
    if (this.isEditMode) {
      this.getInfo(this.$route.params.id)
    } else {
      this.getModules()
    }
  },
  methods: {
    getInfo(id) {
      RolePermission.userInfo(id).then(res => {
        this.item = res.data.user
        this.modules = res.data.modules
      })
    },
    getModules() {
      RolePermission.allModules().then(res => {
        this.modules = res.data.modules
      })
    },
    getRoles() {
      RolePermission.roles().then(res => {
        this.roles = res.data.roles
      })
    },
    getOffices() {
      RolePermission.officeList().then(res => {
        this.offices = res.data.offices
      })
    },
    togglePermission(permissions) {
      console.log(permissions)
      // this.item.permissions = permissions
    },
    handleCreateAction() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return this.$notify({
          type: 'error',
          message: 'Validation Error'
        })
      } else {
        this.handlePermissions()
        RolePermission.userAdd(this.item).then(res => {
          this.$notify({
            type: 'success',
            message: res.message
          })
          this.$router.push({ name: 'Users' })
        })
      }
    },
    handleUpdateAction() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return this.$notify({
          type: 'error',
          message: 'Validation Error'
        })
      } else {
        this.handlePermissions()
        RolePermission.userUpdate(this.item, this.$route.params.id).then(res => {
          this.$notify({
            type: 'success',
            message: res.message
          })
          this.$router.push({ name: 'Users' })
        })
      }
    },
    handlePermissions() {
      const permissions = []
      this.modules.map(module => module.features.map(feature => feature.permissions.map(permission => {
        if (permission.checked_by_user) {
          permissions.push(permission.id)
        }
      })))
      this.item.permissions = permissions
      // return permissions
    }
  }
}
</script>
<style scoped>
.error {
  color: red;
}
</style>
