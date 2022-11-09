import Vue from "vue"
import VueRouter from "vue-router"

const HomeView=()=>import('../views/HomeView.vue')
const ArticleView=()=>import('../views/ArticleView.vue')
Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'home'},
  {
    path:"/home",
    component:HomeView
  },
  {
    path:"/article/:articleId",
    component:ArticleView
  }
]

const router = new VueRouter({
  mode:"history",
  routes
});
export default router