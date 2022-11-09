<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-title">管理员登录</div>
      <!-- 登录表单 -->
      <el-form
        status-icon
        :model="loginForm"
        :rules="rules"
        ref="ruleForm"
        class="login-form"
      >
        <!-- 用户名输入框 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="User"
            placeholder="用户名"
            @keyup.enter.native="login"
          />
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="Lock"
            show-password
            placeholder="密码"
            @keyup.enter.native="login"
          />
        </el-form-item>
      </el-form>
      <!-- 登录按钮 -->
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import {adminStore} from '@/store/modules/admin'
export default {
  data: function() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      var that = this
      this.$axios({
        url:"/api/login",
        method:"post",
        data:this.loginForm,
      })
      .then(function(response){
        if(response.data.flag){
          ElMessage.success("登录成功");
          adminStore().token=response.data.data;
          that.$router.push('/admin');
        }
        else{
          ElMessage.success("密码或账号错误");
        }
      })
    }
  }
};
</script>

<style scoped>
.login-container {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: url(https://static.talkxj.com/config/0w3pdr.jpg) center center /
      cover no-repeat;
}
.login-card {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    padding: 170px 60px 180px;
    width: 350px;
}
.login-title {
    color: #303133;
    font-weight: bold;
    font-size: 1rem;
}
.login-form {
    margin-top: 1.2rem;
}
.login-card button {
    margin-top: 1rem;
    width: 100%;
}
</style>