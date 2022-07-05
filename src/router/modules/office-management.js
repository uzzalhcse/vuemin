/** When your routing table is too long, you can split it into small modules **/

import AdminLayout from '@/layout/admin'

const officeRouter = {
  path: '/office-management',
  component: AdminLayout,
  name: 'OfficeManage',
  meta: {
    title: 'Office',
    module: ['office_management'],
    icon: 'briefcase'
  },
  children: [
    /*
    * For Role and Permission
    */
    {
      path: 'offices',
      component: () => import('@/views/admin/office'),
      name: 'Offices',
      meta: { title: 'Offices', icon: 'briefcase', slugs: ['office_management.offices.index'] }
    },
    {
      path: 'add-office',
      component: () => import('@/views/admin/office/action'),
      name: 'AddOffice',
      hidden: true,
      meta: { title: 'Add Office', slugs: ['office_management.offices.store'] }
    },
    {
      path: 'edit-office/:id',
      component: () => import('@/views/admin/office/action'),
      name: 'EditOffice',
      hidden: true,
      meta: { title: 'Edit Office', slugs: ['office_management.offices.update'] }
    }
  ]
}
export default officeRouter
