<template>
   <div class="login_container">
<div class="login_box">
  <p>电商后台管理系统</p>
  <!-- 输入框 -->
  <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" class="inputarea">
  <el-form-item prop="username">
    <el-input v-model='loginForm.username'  prefix-icon="el-icon-user-solid" placeholder="请输入用户名"></el-input>
  </el-form-item>
   <el-form-item prop="password">
    <el-input  v-model='loginForm.password' prefix-icon="el-icon-lock" placeholder="请输入密码" type="password"></el-input>
  </el-form-item>
  <!-- 按钮 -->
   <el-form-item class="btns">
    <el-button type="primary" @click="userLogin">登录</el-button>
    <el-button type="info" @click="resetContent">重置</el-button>
  </el-form-item>
  </el-form>
  
  </div>
  </div>
</template>

<script>
export default {
    data(){
      return{
      loginForm:{
        username:'admin',
        password:'123456'
      }  ,
      // 验证规则----------------
    loginFormRules:{
    name:[
      { required: true, message: '请输合法的名称', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    password:[ { required: true, message: '请输入正确的密码', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6个字符', trigger: 'blur' }]
      },
   }
   },
  methods:{
    // 内容重置以及登录验证------------
 resetContent(){
  this.$refs.loginFormRef.resetFields();
   },
   userLogin(){
     this.$refs.loginFormRef.validate(async valid=>{
     if(!valid) return;
     const{data:res} = await this.$http.post('login', this.loginForm)
     if(res.meta.status!==200) return 
     this.$message.success('登录成功')
     console.log(res)
     window.sessionStorage.setItem("token",res.data.token)
    this.$router.push('/home')
     })
   }
 }
  }

</script>

<style lang="less" scoped>
.login_container {
 background-color: #8dadaf;
  height: 100%;
  .login_box{
  position: absolute;
  top: 50%;
  left: 50%;
  transform:translate(-50% ,-50%);
  width: 400px;
  height: 350px;
  background-color:#8dafb2;
  border: 1px solid #acc8ca;
  box-shadow: rgba(0,0,0,0.2);
  text-align: center;
  font-size: 25px;
  color: rgb(39, 39, 39);
}
};

.inputarea{
  position: absolute;
  width: 100%;
  bottom:0;
  padding: 0 10px;
  box-sizing: border-box;
}
.btns{
  display:flex;
  justify-content: flex-end;
  margin-bottom: 30px;
}
</style>
