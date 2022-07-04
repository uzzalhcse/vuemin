<template>
  <span v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <li v-if="onlyOneChild.meta" :class="{'active': is_active}" class="menu">
        <router-link :to="resolvePath(onlyOneChild.path)" :aria-expanded="is_active" class="dropdown-toggle">
          <div class="">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span>{{ onlyOneChild.meta.title }}</span>
          </div>
        </router-link>
      </li>
    </template>

    <li v-else :class="{'active': is_active}" class="menu">
      <a :href="'#menu_'+index" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
        <div class="">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span>{{ item.meta.title }}</span>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6" /></svg>
        </div>
      </a>
      <ul :id="'menu_'+index" :class="{'show': is_active}" class="collapse submenu list-unstyled" data-parent="#accordionExample">
        <li v-for="child in item.children" v-if="!child.hidden" :key="child.path" :class="$route.name === child.name? 'active' : '' ">
          <router-link :to="{ name: child.name}">{{ child.meta.title }}</router-link>
        </li>
      </ul>
    </li>
  </span>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
export default {
  name: 'SidebarItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  computed: {
    is_active() {
      const that = this
      if (that.item.children && that.item.children.length) {
        return that.item.children.map(itm => itm.name).includes(that.$route.name)
      }
      return that.item === that.$route.name
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
