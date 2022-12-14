const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave:false,
  devServer:{
    port:8082,
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
