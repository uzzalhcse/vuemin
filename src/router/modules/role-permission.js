/** When your routing table is too long, you can split it into small modules **/

import AdminLayout from '@/layout/admin'

const rolesPermissionRouter = {
  path: '/role-permission',
  component: AdminLayout,
  name: 'RolesPermission',
  meta: {
    title: 'Roles & Permissions',
    module: ['user_role_management'],
    icon: 'package'
  },
  children: [
    /*
    * Role and Permission
    */
    {
      path: 'roles',
      component: () => import('@/views/admin/roles-permissions/role-permissions'),
      name: 'RoleAndPermissions',
      meta: { title: 'Role', icon: 'octagon', slugs: ['user_role_management.roles.index'] }
    },
    {
      path: 'add-role',
      component: () => import('@/views/admin/roles-permissions/role-permissions/action'),
      name: 'AddRolePermissions',
      hidden: true,
      meta: { title: 'Add Role Permissions', slugs: ['user_role_management.roles.store'] }
    },
    {
      path: 'edit-role/:id(\\d+)',
      component: () => import('@/views/admin/roles-permissions/role-permissions/action'),
      name: 'EditRolePermissions',
      hidden: true,
      meta: { title: 'Edit Role Permissions', slugs: ['user_role_management.roles.update'] }
    },
    /*
    * User
    */
    {
      path: 'users',
      component: () => import('@/views/admin/roles-permissions/users'),
      name: 'Users',
      meta: { title: 'Users', icon: 'users', slugs: ['user_role_management.users.index'] }
    },
    {
      path: 'add-user',
      component: () => import('@/views/admin/roles-permissions/users/action'),
      name: 'AddUser',
      hidden: true,
      meta: { title: 'Add User', slugs: ['user_role_management.users.store'] }
    },
    {
      path: 'edit-user/:id(\\d+)',
      component: () => import('@/views/admin/roles-permissions/users/action'),
      name: 'EditUser',
      hidden: true,
      meta: { title: 'Edit User', slugs: ['user_role_management.users.update'] }
    }
  ]
}
export default rolesPermissionRouter
