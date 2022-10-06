import { createRouter,createWebHistory } from "vue-router";

const LoginView=()=>import('../components/admin/LoginView.vue')
const AdminView=()=>import('../components/admin/AdminView.vue')
const HelloWorld=()=>import('../components/HelloWorld.vue')
const routes = [
  {
    path:"/login",
    component:LoginView,
    meta:{ isAdmin:false }
  },
  {
    path:"/admin",
    component:AdminView,
    children:[
      {
        path:'AdminHome',
        name:'AdminHome',
        components:{AdminSideBar:()=>import('@/components/admin/AdminHome')}
      },
      {
        path:'BlogList',
        name:'BlogList',
        components:{AdminSideBar:()=>import('@/components/admin/BlogList')}
      },
      {
        path:'AddBlog',
        name:'AddBlog',
        components:{AdminSideBar:()=>import('@/components/admin/AddBlog')}
      }
    ],
    meta:{ isAdmin:true }
  },
  
  {
    path:"/home",
    component:HelloWorld,
    meta:{ isAdmin:false }
  }
]

const router = createRouter({
  history:createWebHistory(),
  routes:routes
})


export default router;