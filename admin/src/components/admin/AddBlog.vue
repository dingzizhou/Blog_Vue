<template>
<!-- <h1>AddBlog</h1> -->
<el-card class="main-card">
  <div class="title">上传文章</div>
  <!-- 文章其他信息 -->
  <div class="article-title-container">
    <el-input placeholder="输入文章标题" v-model="article.title"
     style="margin-left:10px"></el-input>
    <el-select v-model="article.category" value-key="id" placeholder="请选择分类"
     style="margin-left:10px">
      <el-option v-for="item in categoryList" :key="item.id" :label="item.name"
       :value="item"/>
    </el-select>
    <el-select v-model="article.tagList" value-key="id" multiple placeholder="请选择标签"
     style="margin-left:10px">
      <el-option v-for="item in tagList" :key="item.id" :label="item.name"
       :value="item"/>
    </el-select>
    <el-switch inline-prompt v-model="article.isTop" style="margin-left:10px" size="large"
     active-text="置顶" inactive-text="不置顶"
     active-value="1" inactive-value="0"></el-switch>
    <el-button type="danger"
     style="margin-left:10px" @click="updateOrAddArticle()">发布文章</el-button>
  </div>
  <!-- 文章主体 -->
  <mavon-editor v-model="article.content" style="height:calc(100vh - 240px)"></mavon-editor>
</el-card>
</template>

<script>
import { ElMessage } from 'element-plus';

export default{
  data:function(){
    return{
      article:{
        id:null,
        title:null,
        category:null,
        tagList:[],
        isTop:0,
        content:null,
      },
      tagList:[],
      categoryList:[],
    }
  },
  methods:{
    getArticle(){
      var that = this;
      this.$axios({
        method:'get',
        url:'/api/admin/articleId',
        params:{
          id:that.article.id
        }
      })
      .then(function(response){
        if(response.data.flag){
          that.article=response.data.data;
        }
        else{
          ElMessage.error("预载文章失败，请返回并重新选择");
        }
      })
    },
    listCategory(){
      var that = this;
      this.$axios({
        method:'get',
        url:'/api/admin/categoryList',
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
        method:'get',
        url:'/api/admin/tagList'
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
    updateOrAddArticle(){
      // console.log(this.article);
      var that = this;
      if(this.article.id!=null){
        this.$axios({
          method:'post',
          url:'/api/admin/updateArticle',
          data:that.article
        })
        .then(function(response){
          if(response.data.flag){
            ElMessage.success("修改成功成功")
            that.$router.push({name:'BlogList',replace:true})
          }
          else{
            ElMessage.error("失败")
          }
        })
      }
      else{
        this.$axios({
          method:'post',
          url:'/api/admin/addArticle',
          data:that.article
        })
        .then(function(response){
          if(response.data.flag){
            ElMessage.success("添加文章成功")
            that.$router.push({name:'BlogList',replace:true})
          }
          else{
            ElMessage.error("失败")
          }
        })
      }
    },
  },
  created(){
    this.listCategory();
    this.listTag();
    this.article.id=this.$route.query.id;
    if(this.article.id!=null){
      this.getArticle();
    }
  },
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
.article-title-container {
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
  margin-top: 2.25rem;
}
</style>