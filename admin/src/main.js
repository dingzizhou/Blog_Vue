import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import locale from 'element-plus/lib/locale/lang/zh-cn' //中文
import axios from 'axios'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.$axios = axios
app.use(router)
app.use(store)
app.use(ElementPlus,{locale})
app.use(mavonEditor)
// const axios = require('axios');

import { adminStore } from './store/modules/admin'
axios.interceptors.request.use(config => {
    config.headers.common['token'] = adminStore().token;
    return config;
})
import { ElMessage } from 'element-plus';
axios.interceptors.response.use(response=>{
    // console.log(response)
    if(response.data.code == 401){
        ElMessage.error({
            message:"请登录",
            duration:3000
        })
        router.push('/login')
    }
    return response;
})

// router.beforeEach((to,from,next)=>{
//     console.log(adminStore().token)
//     if(to.meta.isAdmin){
//         if(adminStore().token){
//             next();
//         }
//         else{
//             router.push('/login')
//         }
//     }
//     else {
//         next();
//     }
// })

app.mount('#app')