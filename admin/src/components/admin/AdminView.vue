<template>
<!-- <h1>AdminView</h1> -->
<el-container class="admin-home-container">
  <!-- 头部 -->
  <el-header>
    <div style="display: flex;align-items: center;">
      <span style="margin-left: 15px;">博客后台管理</span>
    </div>
    <el-button type="info" @click="logout">退出</el-button>
  </el-header>
  <!-- 主体 -->
  <el-container>
    <el-aside width="200px">
      <SideBar/>
    </el-aside>
    <el-main>
      <router-view name="AdminSideBar"></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import { adminStore } from '@/store/modules/admin';
import SideBar from './SideBar.vue';
export default{
  components:{
    SideBar
  },
  data:function(){
    return{

    }
  },
  methods:{
    logout(){
      adminStore().token=null;
      this.$router.push('/login');
      console.log("退出")
    }
  }
}
</script>

<style scoped>
.admin-home-container {
  height: 100%;
}
.el-header {
  background-color: #333744;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
</style>