import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminLayout from '@/layout/admin'
import rolesPermissionRouter from './modules/role-permission'
import officeRouter from './modules/office-management'

Vue.use(VueRouter)

export const publicRoutes = [
  {
    path: '/redirect/:path(.*)',
    name: 'Redirect',
    component: () => import('@/views/redirect/index'),
    hidden: true,
    meta: { title: 'Redirect', isPublic: true, icon: 'home' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/admin/auth/login'),
    hidden: true,
    meta: { title: 'Login', isPublic: true, icon: 'home' }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/error-page/404'),
    hidden: true,
    meta: { title: '404', isPublic: true, icon: 'home' }
  },
  {
    path: '/401',
    name: 'UnAuthenticated',
    component: () => import('@/views/error-page/401'),
    hidden: true,
    meta: { title: '401', isPublic: true, icon: 'home' }
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/dashboard',
    component: AdminLayout,
    meta: { title: 'Home', icon: 'home' },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/admin/Dashboard'),
        meta: { title: 'Dashboard', icon: 'home' }
      }
    ]
  },
  {
    path: '/settings',
    name: 'Settings',
    redirect: '/profile',
    component: AdminLayout,
    meta: { title: 'Settings', icon: 'home' },
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/admin/Dashboard'),
        meta: { title: 'Profile', icon: 'home' }
      },
      {
        path: 'change-password',
        name: 'ChangePassword',
        component: () => import('@/views/admin/Dashboard'),
        meta: { title: 'Change Password', icon: 'home' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on acl permissions
 */
export const asyncRoutes = [
  officeRouter,
  rolesPermissionRouter,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: publicRoutes
})
const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
