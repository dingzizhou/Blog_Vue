<template>
<div>
  <!-- 封面图 -->
  <div class="banner" :style="articleCover">
    <div class="article-info-container">
      <!-- 文章标题 -->
      <div class="article-title">{{ article.title }}</div>
      <div class="article-info">
        <div class="first-line">
          <!-- 发表时间 -->
          <span>
            <i class="el-icon-date"></i>
            {{ article.createTime}}
            <span class="separator"> | </span>
          </span>
          <!-- 更新时间 -->
          <span>
            <span>
            <i class="el-icon-time"></i>
            更新于
            <template v-if="article.updateTime">
                {{ article.updateTime }}
              </template>
          </span>
          </span>
        </div>
        <div class="second-line">
          <!-- 文章分类 -->
          <span class="article-category">
            <i class="el-icon-menu"></i>
            {{ article.createTime}}
            <span class="separator"> | </span>
          </span>
          <!-- 文章标签 -->
          <span class="article-category">
            <i class="el-icon-s-ticket"></i>
            <span v-for=" tagItem of article.tagList" :key="tagItem.id">
              {{tagItem.name}}
            </span>
            <span class="separator"> | </span>
          </span>
          <!-- 阅读量 -->
          <span>
            阅读量：{{article.view}}
          </span>
        </div>
      </div>
    </div>
  </div>
  <!-- 内容 -->
  <v-row class="article-container">
    <v-col>
      <v-card class="article-wrapper">
        <article v-html="compileMarkdown(article.content)"/>

        <!-- 前后文章跳转 -->
        <div class="pagination-post">
          <!-- 上一篇 -->
          <div :class="ifFull(lastArticle)" v-if="lastArticle">
            <router-link :to="'/article/'+lastArticle">
              <img
                  class="post-cover"
                  :src="'https://static.talkxj.com/articles/3dffb2fcbd541886616ab54c92570de3.jpg'"
                />
              <div class="post-info">
                <div class="label">上一篇</div>
                <div class="post-title">test</div>
              </div>
            </router-link>
          </div>
          <div :class="ifFull(nextArticle)" v-if="nextArticle">
            <router-link :to="'/article/'+nextArticle">
              <img
                  class="post-cover"
                  :src="'https://static.talkxj.com/articles/db33914d490eb15b81e6ff4cfacaea84.jpg'"
                />
              <div class="post-info"  style="text-align: right">
                <div class="label">下一篇</div>
                <div class="post-title">test</div>
              </div>
            </router-link>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</div>
</template>

<script>
import { marked } from "marked"
export default {
  name: 'Home',
  data: function() {
    return {
      path:this.$route.path,
      article:{
        title:"test",
        createTime:"2022-2-2 9:00:00",
        updateTime:"2022-2-2 19:00:00",
        category:"test",
        cover:'https://static.talkxj.com/articles/3dffb2fcbd541886616ab54c92570de3.jpg',
        content:"<h1>test</h1>",
        view:0,
      },
      lastArticle:0,
      nextArticle:2,
    };
  },
  methods:{
    getArticle(){
      const that = this;
      this.axios({
        methods:'get',
        url:"/api"+this.path,
      })
      .then(function(response){
        if(response.data.flag){
          that.article=response.data.data;
          that.lastArticle=that.article.id-1;
          that.nextArticle=that.article.id+1;
        }
      })
    },
    compileMarkdown(content){
      return marked.parse(content)
    }
  },
  created(){
    // this.getArticle()
  },
  computed: {
    articleCover(){
      return(
        "background: url(" +
        this.article.cover +
        ") center center / cover no-repeat"
      );
    },
    ifFull(){
      return function(id){
        return id ? "post full":"post"
      }
    }
  },
  watch:{
    $route:{
      immediate:true,
      handler(){
        this.path = this.$route.path
        this.getArticle()
      }
    }
  }
};
</script>

<style scoped>
.banner:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  
}
.banner {
  position: absolute;
  background-color: #49b1f5 !important;
  top: -60px;
  left: 0;
  right: 0;
  height: 400px;
  animation: header-effect 1s;
  color: #eee !important;
}
.article-info-container{
  position: absolute;
  bottom: 6.25rem;
  padding: 0 8%;
  width: 100%;
  text-align: center;
}
.article-title{
  font-size: 35px;
  margin:20px 0 8px;
}
.article-info i {
  font-size: 14px;
}
.article-info {
  font-size: 14px;
  line-height: 1.9;
  display: inline-block;
}
.article-info span {
  font-size: 95%;
}
.article-category a {
  color: #fff !important;
}
.article-container{
  animation: main 1s;
  max-width: 1200px;
  margin: 372.5px auto 40px auto !important;
  padding: 0 5px;
}
.article-content {
  /* line-height: 2; */
  /* overflow: hidden; */
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.article-wrapper{
  padding: 50px 40px;
}
.pagination-post {
  margin-top: 40px;
  overflow: hidden;
  width: 100%;
  background: #000;
  display: flex;
}
.post{
  width: 50%;
}
.full {
  width: 100% !important;
}
.post-info {
  position: absolute;
  top: 50%;
  padding: 20px 40px;
  width: 100%;
  transform: translate(0, -50%);
  line-height: 2;
  font-size: 14px;
}
.post-title {
  font-weight: 500;
  color: #fff;
}
.label {
  font-size: 90%;
  /* color: #eee; */
  color: #eee;
}
.post-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  transition: all 0.6s;
  object-fit: cover;
}
.post a {
  position: relative;
  display: block;
  overflow: hidden;
  height: 150px;
}
.post:hover .post-cover {
  opacity: 0.8;
  transform: scale(1.1);
}
</style>