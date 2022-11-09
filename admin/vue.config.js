const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:"/",
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    port:8081,
    proxy:{
      '/api':{
        target:'http://localhost:8080',
        changeOrigin:true,
        pathRewrite:{
          "/api":""
        }
      }
    }
  }
})
