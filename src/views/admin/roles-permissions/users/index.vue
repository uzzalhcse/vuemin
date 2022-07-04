<template>
  <div class="layout-px-spacing">
    <!-- CONTENT AREA -->
    <div class="row layout-top-spacing">
      <div class="col-lg-12 col-12 layout-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-header">
            <div class="row" style="padding: 10px 15px">
              <div class="col-6">
                <h2 class="mt-1">Users</h2>
              </div>
              <div v-if="can('user_role_management.users.store')" class="col-6 text-right">
                <button type="button" class="btn btn-primary mt-3" @click="$router.push({ name: 'AddUser'})">Create User</button>
              </div>
            </div>
          </div>
          <div class="widget-content widget-content-area">
            <div class="table-responsive">
              <table class="table table-bordered table-hover table-striped table-checkable table-highlight-head mb-4">
                <thead>
                <tr>
                  <th class="">Name</th>
                  <th class="">Email</th>
                  <th class="">Status</th>
                  <th class="">Role</th>
                  <th class="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="el in item.data" :key="el.id">
                  <td>
                    <p class="mb-0">{{ el.name }}</p>
                  </td>
                  <td>
                    <p class="mb-0">{{ el.email }}</p>
                  </td>
                  <td>
                    <p class="mb-0">{{ el.status_id === 1 ? 'Active' : 'InActive' }}</p>
                  </td>
                  <td>
                    <p class="mb-0">
                      <span class="badge badge-info mr-2" v-for="role in el.roles" :key="role.id">{{ role.name }}</span>
                    </p>
                  </td>
                  <td class="text-center">
                    <ul class="table-controls">
                      <li v-if="can('user_role_management.users.update')"><a href="javascript:void(0);" data-toggle="tooltip" data-placement="top" title="Edit" data-original-title="Edit" @click="$router.push({ name: 'EditUser', params: {id: el.id}})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 text-success"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a></li>
                      <li v-if="can('user_role_management.users.destroy')"><a href="javascript:void(0);" data-toggle="tooltip" data-placement="top" title=" Delete" data-original-title="Delete" @click="handleConfirm(el.id)"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 text-danger"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></a></li>
                    </ul>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="paginating-container pagination-solid">
              <div class="row justify-content-center">
                <div class="col-6 offset-3">
                  <pagination :data="item" @pagination-change-page="getItems">
                    <template #prev-nav>
                      <span>Prev</span>
                    </template>
                    <template #next-nav>
                      <span>Next</span>
                    </template>
                  </pagination>
                </div>
              </div>
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
import LaravelVuePagination from 'laravel-vue-pagination'
import RolePermission from '@/services/api/RolePermission'

export default {
  name: 'Users',
  components: {
    'Pagination': LaravelVuePagination
  },
  data() {
    return {
      item: {
      }
    }
  },
  mounted() {
    this.getItems(1)
  },
  methods: {
    getItems(page = 1) {
      RolePermission.users(page).then(res => {
        this.item = res.data.item
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
      RolePermission.userDelete(id).then(res => {
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

<style scoped src="@/assets/css/tables/table-basic.css"></style>
