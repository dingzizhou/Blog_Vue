<template>
<div>
  <!-- banner -->
  <div class="home-banner">
    <div class="banner-container">
      <h1 class="blog-title animated zoomIn">AnchoR</h1>
    </div>
    <div class="blog-contact">
      <a href="https://github.com" target="_blank" style="margin-right: 50px "><img src="../assets/icons/GitHub.svg" link="https://github.com"/></a>
    </div>
  </div>
  <!-- 主页文章 -->
  <v-row class="home-container">
    <v-col md="10">
      <v-card style="border-radius: 12px 8px 8px 12px" class="article-card"
       v-for="item of articleList" :key="item.id">
        <!-- 文章信息 -->
        <div class="article-wrapper">
          <!-- 标题 -->
          <div style="line-height:1.4">
            <router-link style="font-size: 36px;" :to="'/article/'+item.id">
              {{item.title}}
            </router-link>
          </div>
          <div class="article-info">
            <!-- 是否置顶 -->
            <span v-if="item.isTop==1">
              <span style="color:#ff7242"><i class="el-icon-top"></i>置顶</span><span class="separator">|</span>
            </span>
            <!-- 发表时间 -->
            <i class="el-icon-date"></i>
            {{ item.createTime | date }}
            <span class="separator">|</span>
            <!-- 文章分类 -->
            <i class="el-icon-menu"></i>
            {{item.category}}
            <span class="separator">|</span>
            <!-- 文章标签 -->
            <span v-for=" tagItem of item.tagList" :key="tagItem.id">
              <i class="el-icon-s-ticket"></i>{{tagItem.name}}
            </span>
          </div>
          <!-- 文章内容 -->
          <div class="article-content">{{ item.content }}</div>
        </div>
      </v-card>
    </v-col>
  </v-row>
  <div class="demo-pagination-block">
    <el-pagination background layout="prev, pager, next, jumper" :total="total" :page-size="10"
    @current-change="handleCurrentChange" :current-change="current"></el-pagination>
  </div>
</div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data:function(){
    return{
      total:100,
      current:1,
      articleList:[
        {
          id:1,
          title:"test1",
          isTop:1,
          createTime:"2022-2-2 9:00:00",
          category:"test1",
          tagList:[
            {id:"1",name:"tag1"},
            {id:"2",name:"tag2"},
          ],
          content:"测试|测试|测试|测试|测试|测试|测试|测试|测试|测试|测试|测试|测试|测试|测试|测试|测试|测试|测试|",
        }
      ],
    }
  },
  created(){
    this.getArticleList()
  },
  methods:{
    getArticleList(){
      var that = this;
      this.axios({
        method:'get',
        url:'/api/home/articleList',
        params:{
          current:this.current,
        }
      })
      .then(function(response){
        if(response.data.flag){
          that.articleList=response.data.data.articleList;
          that.total=response.data.data.count;
        }
      })
    },
    handleCurrentChange(val){
      this.current=val
    }
  }
}
</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
}
.home-banner {
  position: absolute;
  top: 0px;
  left: 0;
  right: 0;
  height: 100vh;
  background: url("https://r.photo.store.qq.com/psc?/V53KcXfb1umonn4HbITu3rINxs43TczD/45NBuzDIW489QBoVep5mcQaBtLM2yTpYe999VZqnRjqLW3e23.UCR78O5Km8SpsknNgOGpEzdY7QHY1usDO6pbksfeQBV5CqlMGgsjJVV9s!/r") center center /
  cover no-repeat;
  background-color: #49b1f5;
  background-attachment: fixed;
  text-align: center;
  /*color: #fff !important;*/
  animation: header-effect 1s !important;
}
.banner-container {
  margin-top: 43vh;
  line-height: 1.5;
  color: #eee;
}
.blog-title{
  font-size: 60px;
}
.blog-contact{
  font-size: 1.25rem;
  line-height: 2;
}
.home-container{
  max-width: 1200px;
  margin: calc(100vh) auto 28px auto;
  padding: 0 5px;
}
.article-card{
  display: flex;
  align-items: center;
  height: 280px;
  width: 100%;
  margin-top: 20px;
}
.article-card:hover .on-hover{
  transform: scale(1.1);
}
.article-wrapper {
  font-size: 14px;
  padding: 0 2.5rem;
  /* width: 55%; */
}
.article-wrapper a{
  font-size: 1.5rem;
  transition: all 0.3s;
}
.separator{
  margin: 0 6px;
}
.article-content {
  line-height: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.demo-pagination-block {
  float: right;
  margin-right: 320px;
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
