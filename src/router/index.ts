import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/account/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue'),
      children:[
        {
          path:'/home/index',
          name:'index',
          component:()=>import('../views/index/Index.vue')
        },
        {
          path:'/home/userList',
          name:'userList',
          component:()=>import('../views/setting/UserList.vue')
        },
        {
          path:'/home/roleList',
          name:'roleList',
          component:()=>import('../views/setting/RoleList.vue')
        },
        {
          path:'/home/menuList',
          name:'menuList',
          component:()=>import('../views/setting/MenuList.vue')
        },
        {
          path:'/home/permissionList',
          name:'permissionList',
          component:()=>import('../views/setting/PermissionList.vue')
        },
      ]
    },

  ]
})

export default router
