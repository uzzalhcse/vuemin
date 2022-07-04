<template>
  <div class="layout-px-spacing">
    <!-- CONTENT AREA -->
    <div class="row layout-top-spacing">

      <div class="col-12 layout-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-header">
            <div class="row" style="padding: 10px 15px">
              <div class="col-6">
                <h2 class="mt-1">{{ isEditMode ? 'Edit' : 'Add' }} Office</h2>
              </div>
              <div class="col-6 text-right">
                <button type="button" class="btn btn-primary mt-3 mr-3" @click="isEditMode ? handleUpdateAction() : handleCreateAction()">{{ isEditMode ? 'Update' : 'Save' }}</button>
                <button type="button" class="btn btn-danger mt-3" @click="$router.go(-1)">Cancel</button>
              </div>
            </div>
          </div>
          <form class="widget-content widget-content-area">
            <div class="form-row">
              <div class="form-group col-6">
                <label>Name</label>
                <input v-model="$v.item.name.$model" type="text" class="form-control" placeholder="Please Enter User Name" :class="($v.item.name.$anyError || !$v.item.name.required) ? 'border-danger' : 'border-none'">
                <p v-if="!$v.item.name.required" class="error">Name field is required</p>
              </div>
              <div class="form-group col-6">
                <label>Office Type</label>
                <select v-model="$v.item.office_type.$model" class="form-control" :class="($v.item.office_type.$anyError || !$v.item.office_type.required) ? 'border-danger' : 'border-none'" @change="isChanging= true">
                  <option :value="null">Choose...</option>
                  <option v-for="type in office_types" :key="type.id" :value="type.id">{{ type.title }}</option>
                </select>
                <p v-if="!$v.item.office_type.required" class="error">Office Type is required</p>
              </div>
              <div class="form-group col-4">
                <label>Jurisdiction</label>
                <select v-model="$v.item.jurisdiction.$model" class="form-control" :class="($v.item.jurisdiction.$anyError || !$v.item.jurisdiction.required) ? 'border-danger' : 'border-none'" @change="isChanging= true">
                  <option :value="null">Choose...</option>
                  <option v-for="jurisdiction in jurisdictions" :key="jurisdiction" :value="jurisdiction">{{ jurisdiction }}</option>
                </select>
                <p v-if="!$v.item.jurisdiction.required" class="error">Jurisdiction is required</p>
              </div>
              <div class="form-group col-4">
                <label>Org code</label>
                <input v-model="item.org_code" type="text" class="form-control" placeholder="Please Enter Org code">
              </div>
              <div class="form-group col-4">
                <label>Status</label>
                <select v-model="$v.item.status_id.$model" class="form-control" :class="($v.item.status_id.$anyError || !$v.item.status_id.required) ? 'border-danger' : 'border-none'" @change="isChanging= true">
                  <option :value="null">Choose...</option>
                  <option v-for="status in statuses" :key="status.id" :value="status.id">{{ status.title }}</option>
                </select>
                <p v-if="!$v.item.status_id.required" class="error">Status field is required</p>
              </div>
              <div v-if="['Division', 'District', 'Upazila', 'Union'].includes(item.jurisdiction)" class="form-group col-6">
                <label>Division</label>
                <el-select v-model="$v.item.division_id.$model" filterable class="el-form-control" placeholder="Select" :class="($v.item.division_id.$anyError || !$v.item.division_id.required) ? 'border-danger' : 'border-none'" @change="isChanging= true">
                  <el-option
                      v-for="division in divisions"
                      :key="division.id"
                      :label="division.name"
                      :value="division.id">
                  </el-option>
                </el-select>
                <p v-if="!$v.item.division_id.required" class="error">Division is required</p>
              </div>
              <div v-if="['District', 'Upazila', 'Union'].includes(item.jurisdiction)" class="form-group col-6">
                <label>District</label>
                <el-select v-model="$v.item.district_id.$model" filterable class="el-form-control" placeholder="Select" :class="($v.item.district_id.$anyError || !$v.item.district_id.required) ? 'border-danger' : 'border-none'" @change="isChanging= true">
                  <el-option
                      v-for="district in districts"
                      :key="district.id"
                      :label="district.name"
                      :value="district.id">
                  </el-option>
                </el-select>
                <p v-if="!$v.item.district_id.required" class="error">District is required</p>
              </div>
              <div v-if="['Upazila', 'Union'].includes(item.jurisdiction)" class="form-group col-6">
                <label>Upazila</label>
                <el-select v-model="$v.item.upazila_id.$model" filterable class="el-form-control" placeholder="Select" :class="($v.item.upazila_id.$anyError || !$v.item.upazila_id.required) ? 'border-danger' : 'border-none'" @change="isChanging= true">
                  <el-option
                      v-for="upazila in upazilas"
                      :key="upazila.id"
                      :label="upazila.name"
                      :value="upazila.id">
                  </el-option>
                </el-select>
                <p v-if="!$v.item.upazila_id.required" class="error">Upazila is required</p>
              </div>
              <div v-if="['Union'].includes(item.jurisdiction)" class="form-group col-6">
                <label>Union</label>
                <el-select v-model="$v.item.union_id.$model" filterable class="el-form-control" placeholder="Select" :class="($v.item.union_id.$anyError || !$v.item.union_id.required) ? 'border-danger' : 'border-none'" @change="isChanging= true">
                  <el-option
                      v-for="union in unions"
                      :key="union.id"
                      :label="union.name"
                      :value="union.id">
                  </el-option>
                </el-select>
                <p v-if="!$v.item.union_id.required" class="error">Union is required</p>
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
import { required, requiredIf } from 'vuelidate/lib/validators'
import RolePermission from '@/services/api/RolePermission'
import Utils from '@/services/api/Utils'

export default {
  name: 'UserAction',
  data() {
    return {
      item: {
        name: null,
        bn_name: null,
        org_code: null,
        office_type: null,
        jurisdiction: null,
        division_id: null,
        district_id: null,
        upazila_id: null,
        union_id: null,
        status_id: null
      },
      office_types: [],
      jurisdictions: [],
      offices: [],
      modules: [],
      divisions: [],
      districts: [],
      upazilas: [],
      unions: [],
      statuses: [],
      isChanging: false
    }
  },
  validations() {
    return {
      item: {
        name: {
          required
        },
        office_type: {
          required
        },
        jurisdiction: {
          required
        },
        division_id: {
          required: requiredIf(function() {
            return ['Division', 'District', 'Upazila', 'Union'].includes(this.item.jurisdiction)
          })
        },
        district_id: {
          required: requiredIf(function() {
            return ['District', 'Upazila', 'Union'].includes(this.item.jurisdiction)
          })
        },
        upazila_id: {
          required: requiredIf(function() {
            return ['Upazila', 'Union'].includes(this.item.jurisdiction)
          })
        },
        union_id: {
          required: requiredIf(function() {
            return ['Union'].includes(this.item.jurisdiction)
          })
        },
        status_id: {
          required
        }
      }
    }
  },
  computed: {
    isEditMode() {
      return this.$route.params && this.$route.params.id
    }
  },
  watch: {
    'item.division_id'(id) {
      if (id) {
        if (this.isChanging) {
          this.item.district_id = null
          this.item.upazila_id = null
          this.item.union_id = null
        }
        this.getDistricts(id)
      }
    },
    'item.district_id'(id) {
      if (id) {
        if (this.isChanging) {
          this.item.upazila_id = null
          this.item.union_id = null
        }
        this.getUpazilas(id)
      }
    },
    'item.upazila_id'(id) {
      if (id) {
        if (this.isChanging) {
          this.item.union_id = null
        }
        this.getUnions(id)
      }
    }
  },
  created() {
    this.getDivisions()
    this.getStatuses()
    this.officeTypes()
    this.officeJurisdictions()
  },
  mounted() {
    if (this.isEditMode) {
      this.getInfo(this.$route.params.id)
    }
  },
  methods: {
    getStatuses() {
      Utils.getStatuses().then(res => {
        this.statuses = res.data.statuses
      })
    },
    getDivisions() {
      Utils.getDivisions().then(res => {
        this.divisions = res.data.divisions
      })
    },
    getDistricts(id) {
      Utils.getDistricts(id).then(res => {
        this.districts = res.data.districts
      })
    },
    getUpazilas(id) {
      Utils.getUpazilas(id).then(res => {
        this.upazilas = res.data.upazilas
      })
    },
    getUnions(id) {
      Utils.getUnions(id).then(res => {
        this.unions = res.data.unions
      })
    },
    officeTypes() {
      RolePermission.officeTypes().then(res => {
        this.office_types = res.data.office_types
      })
    },
    officeJurisdictions() {
      RolePermission.officeJurisdictions().then(res => {
        this.jurisdictions = res.data.jurisdictions
      })
    },
    getInfo(id) {
      this.isLoading = true
      RolePermission.officeInfo(id).then(res => {
        this.item = res.data.office
        this.isLoading = false
      })
    },
    handleCreateAction() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return this.$notify({
          type: 'error',
          message: 'Validation Error'
        })
      } else {
        RolePermission.officeAdd(this.item).then(res => {
          this.$notify({
            type: 'success',
            message: res.message
          })
          this.$router.push({ name: 'Offices' })
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
        RolePermission.officeUpdate(this.item, this.$route.params.id).then(res => {
          this.$notify({
            type: 'success',
            message: res.message
          })
          this.$router.push({ name: 'Offices' })
        })
      }
    }
  }
}
</script>
<style scoped>
.error {
  color: red;
}
</style>
