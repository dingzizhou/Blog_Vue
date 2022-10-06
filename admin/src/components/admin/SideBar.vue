<template>
<el-menu :router="true" default-active="/admin/AdminHome" background-color="#304156" text-color="#BFCBD9" active-text-color="#409EFF">
  <el-menu-item index="/admin/AdminHome">
    <template #title>
      <el-icon><House/></el-icon>
      <span>首页</span>
    </template>
  </el-menu-item>
  <!-- 一级菜单 -->
  <el-sub-menu :index="item.id" v-for="item in this.MenuList" :key="item.id">
    <template #title>
      <el-icon><component :is="item.icon"></component></el-icon>
      <span>{{item.name}}</span>
    </template>
    <el-menu-item :index="'/admin/'+subItem.path" v-for="subItem in item.children">
      <el-icon><component :is="subItem.icon"></component></el-icon>
      <span>{{subItem.name}}</span>
    </el-menu-item>
  </el-sub-menu>
</el-menu>
</template>

<script>
export default{
  data: function(){
    return{
      MenuList:[
        {
          id:"1",
          icon:"Document",
          name:"文章管理",
          children:[
            {
              icon:"List",
              name:"文章列表",
              path:"BlogList"
            },
            {
              icon:"DocumentAdd",
              name:"上传文章",
              path:"AddBlog"
            }
          ],
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>