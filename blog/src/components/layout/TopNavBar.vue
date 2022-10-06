<template>
<v-app-bar app class="nav-fixed" hide-on-scroll flat height="60">
  <!-- 电脑端 -->
  <div class="d-md-block d-none nav-container">
    <div class="float-right nav-title">
      <div class="menus-item">
        <router-link class="menu-btn" to="/">
          <i class="el-icon-s-home"></i>首页
        </router-link>
      </div>
      <div class="menus-item">
        <router-link class="menu-btn" to="/" >
          <i class="el-icon-menu"></i>分类
        </router-link>
      </div>
      <div class="menus-item">
        <router-link class="menu-btn" to="/" >
          <i class="el-icon-s-ticket"></i>标签
        </router-link>
      </div>
    </div>
  </div>
</v-app-bar>
</template>

<script>
export default{
  data:function(){
    return{
      
    }
  }
}
</script>

<style scoped>
i {
  margin-right: 4px;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
.nav {
  background: rgba(0, 0, 0, 0) !important;
}
.nav a {
  color: #eee !important;
}
.nav .menu-btn {
  text-shadow: 0.05rem 0.05rem 0.1rem rgba(0, 0, 0, 0.3);
}
.nav .blog-title a {
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.15);
}
.nav-fixed {
  background: rgba(255, 255, 255, 0.8) !important;
  box-shadow: 0 5px 6px -5px rgba(133, 133, 133, 0.6);
}
.nav-fixed a {
  color: #4c4948 !important;
}
.nav-fixed .menus-item a,
.nav-fixed .blog-title a {
  text-shadow: none;
}
.nav-container {
  font-size: 14px;
  width: 100%;
  height: 100%;
}
.nav-mobile-container {
  width: 100%;
  display: flex;
  align-items: center;
}
.blog-title,
.nav-title {
  display: flex;
  align-items: center;
  height: 100%;
}
.blog-title a {
  font-size: 18px;
  font-weight: bold;
}
.menus-item {
  position: relative;
  display: inline-block;
  margin: 0 0 0 0.875rem;
}
.menus-item a {
  transition: all 0.2s;
}
.nav-fixed .menu-btn:hover {
  color: #49b1f5 !important;
}
.menu-btn:hover:after {
  width: 100%;
}
.menus-item a:after {
  position: absolute;
  bottom: -5px;
  left: 0;
  z-index: -1;
  width: 0;
  height: 3px;
  background-color: #80c8f8;
  content: "";
  transition: all 0.3s ease-in-out;
}
.user-avatar {
  cursor: pointer;
  border-radius: 50%;
}
.menus-item:hover .menus-submenu {
  display: block;
}
.menus-submenu {
  position: absolute;
  display: none;
  right: 0;
  width: max-content;
  margin-top: 8px;
  box-shadow: 0 5px 20px -4px rgba(0, 0, 0, 0.5);
  background-color: #fff;
  animation: submenu 0.3s 0.1s ease both;
}
.menus-submenu:before {
  position: absolute;
  top: -8px;
  left: 0;
  width: 100%;
  height: 20px;
  content: "";
}
.menus-submenu a {
  line-height: 2;
  color: #4c4948 !important;
  text-shadow: none;
  display: block;
  padding: 6px 14px;
}
.menus-submenu a:hover {
  background: #4ab1f4;
}
@keyframes submenu {
  0% {
    opacity: 0;
    filter: alpha(opacity=0);
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    filter: none;
    transform: translateY(0);
  }
}
</style>
