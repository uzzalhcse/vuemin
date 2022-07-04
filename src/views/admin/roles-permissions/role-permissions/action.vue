<template>
  <div class="layout-px-spacing">
    <!-- CONTENT AREA -->
    <div class="row layout-top-spacing">
      <div class="col-12 layout-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-header">
            <div class="row" style="padding: 10px 15px">
              <div class="col-6">
                <h2 class="mt-1">{{ isEditMode ? 'Edit' : 'Create New' }} Role </h2>
              </div>
              <div class="col-6 text-right">
                <button type="button" class="btn btn-primary mt-3 mr-3" @click="isEditMode ? handleUpdateAction() : handleCreateAction()">{{ isEditMode ? 'Update' : 'Save' }}</button>
                <button type="button" class="btn btn-danger mt-3" @click="$router.go(-1)">Cancel</button>
              </div>
            </div>
          </div>
          <!--            {{ item }}-->
          <form class="widget-content widget-content-area">
            <div class="form-row mb-2">
              <div class="form-group col-12">
                <label for="label">Role Name</label>
                <input id="label" v-model="$v.item.name.$model" type="text" class="form-control" placeholder="Please Enter Role Label" :class="($v.item.name.$anyError || !$v.item.name.required) ? 'border-danger' : 'border-none'">
                <p class="error" v-if="!$v.item.name.required">Label field is required</p>
              </div>
              <div class="form-group col-12">
                <label for="label">Description</label>
                <input id="label" v-model="item.description" type="text" class="form-control" placeholder="Please Enter Description">
              </div>
            </div>
            <div class="form-row ml-3">
              <div v-for="module in modules" :key="module.id" class="form-check col-6">
                <input v-model="module.checked" class="form-check-input" type="checkbox" :value="module.id" @input="toggleModule(module)">
                <label class="form-check-label"><h5>{{ module.name }}</h5></label>
                <ol>
                  <li v-for="feature in module.features" :key="feature.id">
                    <div class="form-row">
                      <div class="form-group col-4">
                        <label class="form-check-label"><span>{{ feature.name }}</span></label>
                      </div>
                      <div class="form-group col-8">
                          <span class="option">
                            <div v-for="permission in feature.permissions" v-if="permission.ability_id !== 4" :key="permission.id" class="form-check form-check-inline">
                              <input v-model="permission.checked" class="form-check-input" type="checkbox" :value="permission.id" @change="togglePermission(module, feature, permission)">
                              <label class="form-check-label">
                                <template v-if="permission.ability_id === 1">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                </template>
                                <template v-else-if="permission.ability_id === 2">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                </template>
                                <template v-else-if="permission.ability_id === 3">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                                </template>
                                <template v-else-if="permission.ability_id === 4">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                                </template>
                                <template v-else-if="permission.ability_id === 5">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                                </template>
                                <template v-else-if="permission.ability_id === 6">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>                                </template>
                              </label>
                            </div>
                          </span>
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- CONTENT AREA -->
  </div>
</template>

<script>
import RolePermission from '@/services/api/RolePermission'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'ConfigRoleAction',
  data() {
    return {
      loading: false,
      item: {
        id: null,
        name: null,
        description: null,
        permissions: []
      },
      modules: []
    }
  },
  validations: {
    item: {
      name: {
        required
      }
    }
  },
  computed: {
    isEditMode() {
      return this.$route.params && this.$route.params.id
    }
  },
  created() {
  },
  mounted() {
    if (this.isEditMode) {
      this.role_id = parseInt(this.$route.params.id)
      this.getInfo(this.$route.params.id)
    } else {
      this.getModules()
    }
  },
  methods: {
    getInfo(id) {
      RolePermission.roleShow(id).then(res => {
        this.item = res.data.item
        this.modules = res.data.modules
      })
    },
    getModules() {
      RolePermission.allModules().then(res => {
        this.modules = res.data.modules
      })
    },
    toggleModule(module) {
      module.checked = !module.checked
      // console.log('module=>', module.checked)
      module.features.forEach(feature => {
        feature.permissions.forEach(permission => {
          permission.checked = !!module.checked
        })
      })
    },
    togglePermission(module, feature, permission) {
      // permission.checked = !permission.checked
      // 1 = view, 4 = show
      this.handleDependentPermission(module, feature, permission)
      // this.handleDependentPermission(module, feature, permission, 4)
      /*
     * When module all feature ability is checked
     * then module will be checked
     * or unchecked
     */
      const permissions = []
      module.features.forEach(feature => {
        feature.permissions.forEach(permission => {
          permissions.push(permission)
        })
      })
      const isCheckedAllAbility = permissions.some(function(permission) { return permission.checked })
      module.checked = !!isCheckedAllAbility
    },
    handleDependentPermission(module, feature, permission) {
      /*
      * When click store, edit, or delete
      * assign view is default checked
      */
      if (permission.ability_id !== 1) {
        const feature_permission = feature.permissions.find(item => item.ability_id === 1)
        if (feature_permission) {
          feature_permission.checked = true
        }
      }
      if (permission.ability_id === 3) {
        const feature_permission = feature.permissions.find(item => item.ability_id === 4)
        if (feature_permission) {
          feature_permission.checked = permission.checked
        }
      }

      /*
      * When ability_id is unchecked
      * all ability will be unchecked
      */
      if (permission.ability_id === 1 && permission.checked === false) {
        feature.permissions.forEach(permission => {
          permission.checked = false
        })
      }
    },
    toggleAbility(module, feature, ability) {
      /*
      * When click store, edit, or delete
      * assign view is default checked
      */
      if (ability.id !== 1) {
        const feature_ability = feature.abilities.find(item => item.id === 1)
        if (feature_ability) {
          feature_ability.checked = true
        }
      }
      /*
      * When view is unchecked
      * all ability will be unchecked
      */
      if (ability.id === 1 && ability.checked === false) {
        feature.abilities.forEach(ability => {
          ability.checked = false
        })
      }
      /*
      * When module all feature ability is checked
      * then module will be checked
      * or unchecked
      */
      const abilities = []
      module.features.forEach(feature => {
        feature.abilities.forEach(ability => {
          abilities.push(ability)
        })
      })
      const isCheckedAllAbility = abilities.some(function(ability) { return ability.checked })
      module.checked = !!isCheckedAllAbility
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
        RolePermission.roleStore(this.item).then(res => {
          this.$notify({
            type: 'success',
            message: res.message
          })
          this.$router.push({ name: 'RoleAndPermissions' })
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
        RolePermission.roleUpdate(this.item, this.$route.params.id).then(res => {
          this.$notify({
            type: 'success',
            message: res.message
          })
          this.$router.push({ name: 'RoleAndPermissions' })
        })
      }
    },
    handlePermissions() {
      const permissions = []
      this.modules.map(module => module.features.map(feature => feature.permissions.map(permission => {
        if (permission.checked) {
          permissions.push(permission.id)
        }
      })))
      this.item.permissions = permissions
    }
  }
}
</script>
<style scoped>
.error {
  color: red;
}
</style>
