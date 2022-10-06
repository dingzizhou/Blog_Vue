import Vue from "vue"
import VueRouter from "vue-router"

const HomeView=()=>import('../views/HomeView.vue')

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    component:HomeView
  }
]

const router = new VueRouter({
  mode:"history",
  routes
});
export default router