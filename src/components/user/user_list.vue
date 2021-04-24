<template>
    <div>
        <!-- 导航栏区域 -->
<el-breadcrumb>
  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
<!-- 卡片视图区域 -->
<el-card>
    <!-- 搜索&添加用户 -->
   <el-row :gutter="20">
       <el-col :span="8"><el-input placeholder="请输入搜索内容"  v-model="queryInfo.query" >
    <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
  </el-input></el-col>
       <el-col :span="4"> 
          <el-button type="primary" @click = "showAddDialogVisible"> 添加用户</el-button>
       </el-col>
   </el-row>
   <!-- 用户信息区域 -->
   <el-table :data="userList" border stripe>
         <el-table-column label="序号" type="index"></el-table-column>
         <el-table-column label="姓名"  prop="username" ></el-table-column>
         <el-table-column label="邮箱" prop="email"></el-table-column>
         <el-table-column label="电话" prop="mobile"></el-table-column>
         <el-table-column label="角色" prop="role_name"></el-table-column>
         <el-table-column label="状态" prop="mg_state">
             <template slot-scope="scope">
                 <el-switch  v-model="scope.row.mg_state" @change="changeUserstatus(scope.row)">
            </el-switch>
             </template>
         </el-table-column>
         <el-table-column label="操作" width="180px">
           <template slot-scope="scope">
               <!-- 修改用户 -->
             <el-button type="primary" size="mini" @click="showEditDialogVisible(scope.row.id)"><i class="el-icon-edit"></i></el-button>
             <!-- 删除用户 -->
             <el-button type="danger" size="mini"><i class="el-icon-delete" @click ="deleteUser(scope.row.id)"></i></el-button>
             <!-- 分配角色 -->    
             <el-button type="warning" size="mini" @click="showAllotRoleDialog(scope.row)"><i class="el-icon-setting"></i></el-button>
                </template>
         </el-table-column>
   </el-table>
   <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>
<!-- 添加用户表单 -->
<el-dialog
  title="添加用户" :visible.sync="addDialogVisible" width="50%"> 
  <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" >
  <el-form-item label="用户名称" prop="username">
    <el-input v-model="addForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="addForm.password"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="addForm.email"></el-input>
  </el-form-item>
  <el-form-item label="手机" prop="mobile">
    <el-input v-model="addForm.mobile"></el-input>
  </el-form-item>
  </el-form>
  <!-- 添加&取消按钮 -->
  <span slot="footer" class="dialog-footer">
  <el-button @click="closeDialog">取 消</el-button>
  <el-button type="primary" @click="addUserInfo">确 定</el-button>
  </span>
</el-dialog>
<!-- 修改用户表单 -->
<el-dialog
  title="修改用户信息" :visible.sync="editDialogVisible" width="50%"> 
  <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px" >
  <el-form-item label="用户名称" prop="username">
    <el-input v-model="editForm.username" disabled=true></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="editForm.email"></el-input>
  </el-form-item>
  <el-form-item label="手机" prop="mobile">
    <el-input v-model="editForm.mobile"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
  <el-button @click="cancelEditForm">取 消</el-button>
  <el-button type="primary" @click="saveEditform">确 定</el-button>
  </span>
</el-dialog>
<!-- 分配角色 -->
<el-dialog title="提示" :visible.sync="showAllotDialogVisible" width="30%">
      <div>
      <p>当前的用户 : {{userInfo.username}}</p> 
      <p>当前的角色 : {{userInfo.role_name}}</p>
    <el-select v-model="selectedRoleId" placeholder="请选择">
    <el-option
      v-for="item in rolesList"
      :key="item.id"
      :label="item.roleName"
      :value="item.id">
    </el-option>
  </el-select>
      </div>
  <span slot="footer" class="dialog-footer">
  <el-button @click="showAllotDialogVisible = false">取 消</el-button>
  <el-button type="primary" @click="saveAllotRoleInfo">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>>
<script>
export default {
    data(){
       var checkEmail =(rule,value,cb) =>{
       const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
       if(regEmail.test(value)){
         return cb()
       }
       cb(new Error('请输入合法的邮箱'))}

 var checkMobile =(rule,value,cb) =>{
       const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
       if(regMobile.test(value)){
         return cb()
       }
       cb(new Error('请输入正确的手机号'))}
        return{
          // 分页信息---------------------
            queryInfo:{
         query:'',
         pagenum:1,
         pagesize:5
        },
        total:0,
       userList:[],

      //  添加用户-----------------------------
       addForm:{
           username:'',
           password:'',
           email:'',
           mobile:''
       },
       addFormRules:{
          username: [
            { required: true, message: '请输入正确的用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
          ],
            password: [
            { required: true, message: '请输入正确的密码', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
            email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator: checkEmail , trigger: 'blur' }
          ],
            mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: checkMobile , trigger: 'blur' }
          ],
       },
       addDialogVisible:false,

      //  修改用户信息---------------------------
       editForm:{
           username:'',
           email:'',
           mobile:''
       },
       editDialogVisible:false,
       editFormRules:{
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator: checkEmail , trigger: 'blur' }
          ],
            mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: checkMobile , trigger: 'blur' }
          ],
       },
      //  分配角色-------------------
       showAllotDialogVisible:false,
       userInfo:{},
       rolesList:[],
       selectedRoleId:''
        }
    },
    created(){
    this.getUserList()
    },
    methods:{
      // 获得用户列表-------------------------
     async getUserList(){
         const {data:res} = await this.$http.get('users',{params:this.queryInfo})
         if(res.meta.status!==200) this.$message.error('获取列表失败')
         this.userList = res.data.users
         this.total = res.data.total
     },

    //  更改用户状态-----------------------
     async changeUserstatus(userInfo){
      const{data:res} = this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`) 
      if(res.meta.status!==200) return this.$message.error('保存状态失败')
      this.$message.success('保存状态成功')
     },

  //  分页信息---------------------------------
     showAddDialogVisible(){
         this.addDialogVisible = true
     },
     handleSizeChange(newSize){   
       this.queryInfo.pagesize = newSize
       this.getUserList()
     },
     handleCurrentChange(newPage){
       this.queryInfo.pagenum = newPage
       this.getUserList()
     },
      //  添加用户--------------------------
     addUserInfo(){
        this.$refs.addFormRef.validate(async (valid) => {
        if(!valid) return
          const{data:res} = await this.$http.post('users' , this.addForm)
          if(res.meta.status!==201)  return this.$message.error('提交用户失败')
          this.$message.success('提交用户成功')
          this.getUserList()
          this.addDialogVisible = false
        })
     
     },
     closeDialog(){
      this.$refs.addFormRef.resetFields()
       this.addDialogVisible = false
     },

    //  修改用户信息------------------
  async showEditDialogVisible(id){
   const{data:res} = await this.$http.get('users/'+ id)
   if(res.meta.status !== 200) return this.$message.error('获取信息失败')
  this.editForm = res.data
  this.editDialogVisible=true
  },
  cancelEditForm(){
  this.$refs.editFormRef.resetFields()
  this.editDialogVisible=false
  },
  saveEditform(){
  this.$refs.editFormRef.validate(async valid=>{
    if(!valid) return 
  const{data:res} = await this.$http.put('users/'+this.editForm.id,{
    email:this.editForm.email,
    mobile:this.editForm.mobile
  })
   if(res.meta.status!==200) this.$message.error('提交信息失败')
   this.$message.success('提交信息成功')
    this.editDialogVisible=false
     this.getUserList()
  })
  },
  // 删除用户----------------------------
 async deleteUser(id){
 const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err =>{
          return err
        })
        if(confirmResult !== "confirm") {return this.$message.info("已取消删除")}
      const{data:res} = await this.$http.delete('users/' + id) 
      if(res.meta.status!==200) this.$message.error('删除失败')
      this.$message.success('删除用户成功')
        this.getUserList()
},
// 分配角色----------------------------------
async showAllotRoleDialog(userInfo){
this.userInfo = userInfo
const{data:res} = await this.$http.get('roles')
if(res.meta.status !==200) {
  return this.$message.error('获取角色列表失败')
}
this.rolesList = res.data
this.showAllotDialogVisible = true
},
async saveAllotRoleInfo(){
if (!this.selectedRoleId) {
  return this.$message.error('请选择要分配的角色')
}
const{data:res} = await this.$http.put(`users/${this.userInfo.id}/role`,
 {rid: this.selectedRoleId})
 if(res.meta.status !== 200){
   return this.$message.error('更新角色失败')}
   this.$message.success('更新角色成功')
   this.getUserList()
   this.showAllotDialogVisible=false
}
  }
}
</script>

