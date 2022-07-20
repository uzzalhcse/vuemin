<template>
  <div class="layout-px-spacing">
    <!-- CONTENT AREA -->
    <div class="row layout-top-spacing">
      <div class="col-lg-12 col-12 layout-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-header">
            <div class="row" style="padding: 10px 15px">
              <div class="col-6">
                <h2 class="mt-1">Role & Permissions</h2>
              </div>
              <div v-if="can('user_role_management.roles.store')" class="col-6 text-right">
                <button type="button" class="btn btn-primary mt-3" @click="$router.push({ name: 'AddRolePermissions'})">Create</button>
              </div>
            </div>
          </div>
          <div class="widget-content widget-content-area">
            <div class="table-responsive">
              <table class="table table-bordered table-hover table-striped table-checkable table-highlight-head mb-4">
                <thead>
                <tr>
                  <th class="">Name</th>
                  <th class="">Slug</th>
                  <th class="">Description</th>
                  <th class="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in items" :key="item.id">
                  <td>
                    <p class="mb-0">{{ item.name }}</p>
                  </td>
                  <td>
                    <p class="mb-0">{{ item.slug }}</p>
                  </td>
                  <td>
                    <p class="mb-0">{{ item.description }}</p>
                  </td>
                  <td class="text-center">
                    <ul class="table-controls">
                      <li v-if="can('user_role_management.roles.update')"><a href="javascript:void(0);" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit" @click="$router.push({ name: 'EditRolePermissions', params: {id: item.id}})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 text-success"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a></li>
                      <li v-if="can('user_role_management.roles.destroy')"><a href="javascript:void(0);" data-toggle="tooltip" data-placement="top" title=" Delete" data-original-title="Delete" @click="handleConfirm(item.id)"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 text-danger"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></a></li>
                    </ul>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
    <!-- CONTENT AREA -->
  </div>
</template>

<script>
// @ is an alias to /src
import RolePermission from '@/services/api/RolePermission'
export default {
  name: 'Roles',
  data() {
    return {
      loading: false,
      items: []
    }
  },
  mounted() {
    this.getItems()
  },
  methods: {
    getItems() {
      this.loading = true
      RolePermission.roles().then(res => {
        this.items = res.data.roles
        this.loading = false
      }).catch(err => {
        this.$notify({
          type: 'error',
          message: err
        })
        this.loading = false
      })
    },
    handleConfirm(id) {
      this.$confirm('This will permanently delete the item. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.handleDelete(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        })
      })
    },
    handleDelete(id) {
      RolePermission.roleDelete(id).then(res => {
        this.$notify({
          type: 'success',
          message: res.message
        })
        this.getItems()
      })
    }
  }
}
</script>

<style scoped src="@/assets/css/tables/table-basic.css">
/*@import '@/assets/css/authentication/form-2.css';*/
</style>
