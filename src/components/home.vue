<template>
    <div>
 <el-container class="container">
   <!-- 头部区域 -->
  <el-header>电商后台管理系统 <el-button @click = "loginOut" type="info">退出</el-button>
  </el-header>
  <el-container>
    <!-- 侧边菜单区域 -->
  <el-aside :width="isCollapse ? '64px' :'200px'">
    <div class="hideMenu" @click="togglecollapse">lll</div>
     <el-menu  background-color="#545c64"
      text-color="#fff" active-text-color="#ffd04b" :unique-opened="true" :collapse = "isCollapse" :collapse-transition="false" router>
      <!-- 一级菜单 -->
      <el-submenu :index="'/'+ item.path "  v-for="item in menuList" :key ='item.id'>
        <template slot="title">
        <i class="el-icon-location"></i> <span>{{item.authName}}</span>
        </template>
        <!-- 二级菜单 -->
          <el-menu-item :index="'/'+ subItem.path " v-for= "subItem in item.children" :key = "subItem.id">
             <template slot="title">
        <i class="el-icon-location"></i> <span>{{subItem.authName}}</span>
        </template>
          </el-menu-item>
      </el-submenu>
        </el-menu>
  </el-aside>
    <!-- 主体区域 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
        
    </div>
</template>

<script>
export default {
   created(){
    this.getMenuList()
  },
  data(){
   return{
    menuList:[],
    isCollapse:false
   }
  },
   
 methods:{
        loginOut(){
        window.sessionStorage.clear()
        this.$router.push('/login')
    },
    async getMenuList(){
      const {data:res}= await this.$http.get('menus')
      if(res.meta.status!==200) return this.$message.error('获取列表失败')
      console.log(res)
      this.menuList = res.data
    },
    togglecollapse(){
      this.isCollapse =! this.isCollapse
    }
 }
}
</script>

<style lang="less" scoped>

 .el-header{
     display: flex;
     justify-content: space-between;
     padding-left: 20px;
     background-color: #545c64;
     color: rgb(12, 12, 12);
     align-items: center;
    font-size: 20px;
  }
  
  .el-aside {
    background-color: #545c64;
  }
  
  .el-main {
    background-color: #E9EEF3;
  }
  .hideMenu{
    height: 30px;
    background-color: rgb(124, 123, 123);
    text-align: center;
    line-height: 30px;
    color:#fff;
    letter-spacing: 0.2em;
    cursor: pointer
  }
</style>