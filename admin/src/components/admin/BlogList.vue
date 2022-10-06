<template>
  <!-- <h1>BlogList</h1> -->
<el-card class="main-card">
  <div class="title">文章列表</div>
  <div class="operation-container">
    <el-button type="danger" icon="Delete" @click="mutiDelete">
      批量删除
    </el-button>
    <!-- 表格筛选 -->
    <div style="margin-left:auto">
      <!-- 文章分类 -->
      <el-select clearable v-model="categoryId" placeholder="请选择分类"
       style="margin-right:1rem;width:180px;"
      >
        <el-option
          v-for="item in categoryList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <!-- 文章标签 -->
      <el-select clearable v-model="tagId" placeholder="请选择分类"
       style="margin-right:1rem;width:180px;"
      >
        <el-option
         v-for="item in tagList"
         :key="item.id"
         :label="item.name"
         :value="item.id"
        />
      </el-select>
      <!-- 文章名 -->
      <el-input clearable v-model="keyword" prefix-icon="Search"
       placeholder="请输入文章名" style="width:200px;margin-right:1rem;" @keyup.enter.native="searchArticles"  
      />
      <!-- 搜索 -->
      <el-button type="primary" icon="Search" @click="searchArticles">
        搜索
      </el-button>
    </div>
  </div>
  <!-- 表格展示 -->
  <el-table @selection-change="handleSelectionChange" :data="this.articleList" :border="true" v-loading="loading">
    <!-- 选择列 -->
    <el-table-column type="selection"></el-table-column>
    <!-- 文章标题 -->
    <el-table-column prop="title" label="标题" align="center"></el-table-column>
    <!-- 文章分类 -->
    <el-table-column prop="category.name" label="分类" align="center"></el-table-column>
    <!-- 文章标签 -->
    <el-table-column prop="tag" label="标签" align="center">
      <template #default="scope">
        <el-tag v-for="item of scope.row.tagList" :key="item.tagId" 
         style="margin-right:0.2rem;margin-top:0.2rem;"
        >
          {{item.name}}
        </el-tag>
      </template>
    </el-table-column>
    <!-- 发表时间 -->
    <el-table-column prop="createTime" label="发表时间" align="center" sortable></el-table-column>
    <!-- 修改时间 -->
    <el-table-column prop="updateTime" label="修改时间" align="center" sortable>
    </el-table-column>
    <!-- 是否置顶 -->
    <el-table-column prop="isTop" label="置顶" align="center">
      <template #default="scope">
        <el-switch v-model="scope.row.isTop" active-color="#13ce66" nactive-color="#F4F4F5"
         :active-value="1" :inactive-value="0"
         @change="changeTop(scope.row.id)"
        ></el-switch>
      </template>
    </el-table-column>
    <!-- 操作 -->
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button type="primary" size="small" @click="editArticle(scope.row.id)">
          编辑
        </el-button>
        <el-popconfirm title="确定删除吗？" @click="deleteArticle(scope.row.id)">
          <template #reference>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <div class="demo-pagination-block">
    <el-pagination background
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10,20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
    />
  </div>
</el-card>
</template>

<script>
import { ElMessage } from 'element-plus';

export default{
  data:function(){
    return{
      categoryList:[],
      tagList:[],
      // 搜索
      categoryId:null,
      tagId:null,
      keyword:null,
      // 表格
      loading:true,
      articleList:[
        {
          id:"0",
          title:"test",
          category:"test",
          tagList:[
            {
              id:0,
              name:"test",
            },
          ],
          createTime:"2022/9/3",
          updateTime:"2022/9/3",
          isTop:"0",
        }
      ],
      multipleSelection:[],

      // 分页
      currentPage:1,
      pageSize:10,
      count:0,
    }
  },
  methods:{
    listArticle(){
      var that = this;
      this.loading=true,
      this.$axios({
        method:'get',
        url:'/api/admin/articleList',
        params:{
          current:this.current,
          size:this.size,
          keywords:this.keyword,
          categoryId:this.categoryId,
          tagId:this.tagId,
        }
      })
      .then(function(response){
        if(response.data.flag){
          that.articleList=response.data.data.articleList;
          that.count=response.data.data.count;
          that.loading=false;
        }
      })
    },
    listCategory(){
      var that = this;
      this.$axios({
        method:'get',
        url:'/api/categoryList',
      })
      .then(function(response){
        if(response.data.flag){
          that.categoryList=response.data.data.category;
        }
        else{
          ElMessage.error('分类列表加载失败');
        }
      })
    },
    listTag(){
      var that = this;
      this.$axios({
        mathod:'get',
        url:'/api/tagList'
      })
      .then(function(response){
        if(response.data.flag){
          that.tagList=response.data.data.tag;
        }
        else{
          ElMessage.error(response.flag)
        }
      })
    },
    searchArticles(){
      this.current=1;
      this.listArticle();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    mutiDelete(){
      // 还未实现
    },
    changeTop(id){
      if(id==0){
        return;
      }
      this.$axios({
        url:"/api/admin/article/changeIsTop",
        method:'post',
        params:{
          id:id,
        }
      })
      .then(function(response){
        if(response.data.flag){
          ElMessage.success('是否置顶切换成功');
        }
        else{
          ElMessage.error('是否置顶切换失败');
        }
      })
    },
    editArticle(id){
      this.$router.push({ name: 'AddBlog', query: {id:id} });
    },
    deleteArticle(id){
      // 还未实现
    }
  },
  created(){
    this.listCategory();
    this.listTag();
    this.listArticle();
  },
  watch:{
    current(){
      this.listArticle();
    }
  }
}
</script>

<style scoped> 
.main-card {
  /* min-height: calc(100vh - 126px); */
  height: 90%;
  width: 85%;
  position : absolute;
}
.title {
  position: absolute;
  left: 0;
  font-size: 16px;
  font-weight: bold;
  color: #202a34;
}
.title::before {
  content: '';
  width: 24px;
  height: 16px;
  border-left: 3px solid #0081ff;
  margin-right: 20px;
}
.operation-container {
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
  margin-top: 2.25rem;
}
.demo-pagination-block {
  float: right;
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>