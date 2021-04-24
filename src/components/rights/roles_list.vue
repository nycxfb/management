<template>
    <div>
    <el-breadcrumb>
  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>权限管理</el-breadcrumb-item>
  <el-breadcrumb-item>权限列表</el-breadcrumb-item>
</el-breadcrumb>
<!-- 角色列表区域-------------- -->
<el-card>
    <!-- 添加角色按钮--------------------->
    <el-row>
        <el-col :span="8">
            <el-button type="primary">添加角色</el-button>
        </el-col>
    </el-row>
    <!-- 角色列表区域---------------------->
    <el-table :data="rolesList" border stripe>
        <el-table-column type="expand" >
            <template slot-scope="scope">
              <el-row v-for = "(item1) in scope.row.children" :key = "item1.id" class="formCenter">
                  <!-- 一级列表--------------- -->
                  <el-col :span="5" class="apple">
                   <el-tag type="primary" closable> {{item1.authName}}</el-tag>
                  </el-col>
                  <el-col :span="19">
                  <el-row  v-for = "(item2) in item1.children" :key = "item2.id"  class="formCenter">
                      <!-- 二级列表------------------------- -->
                 <el-col :span="6">
                      <el-tag type="success" closable>{{item2.authName}}</el-tag>
                 </el-col>
                  <el-col :span="18">
                      <!-- 三级列表------------------------------ -->
                      <el-tag type="danger"  v-for = "(item3) in item2.children" :key = "item3.id" 
                      closable @close="removeRights(scope.row,item3.id)">{{item3.authName}}</el-tag>
                 </el-col>
                  </el-row>
                  </el-col>
              </el-row>
            </template>
        </el-table-column>
       <el-table-column type="index" label="#"></el-table-column>
       <el-table-column label="角色名称" prop="roleName"></el-table-column>
       <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
       <el-table-column label="操作">
         <template slot-scope="scope">
          <el-button type="primary" size="mini" ><i class="el-icon-edit"></i>编辑</el-button>
             <!-- 删除用户 -->
             <el-button type="danger" size="mini"><i class="el-icon-delete"></i>删除</el-button>
             <!-- 分配权限 -->
             <el-button type="warning" size="mini" @click="showSetDialogVisible(scope.row)"><i class="el-icon-setting"></i>分配权限</el-button>
         </template>
       </el-table-column>
   </el-table>
</el-card>
<!-- 分配权限对话框----------------------------- -->
<el-dialog title="提示" :visible.sync="setDialogVisible" width="50%" @close = "closeSetDialog">
    <!-- 树形列表----------------------- -->
  <el-tree :data="rightsList" :props="treeProps" show-checkbox node-key = "id" :default-checked-keys = "defaultKeys" 
  default-expand-all ref="treeRef" ></el-tree>
  <span slot="footer" class="dialog-footer">
  <el-button @click="setDialogVisible = false">取 消</el-button>
  <el-button type="primary" @click="saveSetRights">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
    rolesList:[],
    rightsList:[],
    setDialogVisible:false,
     treeProps: {
          label: 'authName',
          children: 'children'
        },
        defaultKeys:[],
        roleId:''
        }
    },
    created(){
    this.getRolesList()
    },
    methods:{
        // 获得用户列表---------------------------
    async getRolesList(){
  const{data:res} = await this.$http.get('roles')
  if(res.meta.status!==200) return this.$message.error('获取列表失败')
  this.rolesList = res.data
    },
    // 移除用户三级权限----------------------------------
   async removeRights(role,rightsId){
    const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err =>{
          return err
        })
        if(confirmResult !== "confirm") {return this.$message.info("已取消删除")}
      const{data:res} = await this.$http.delete(`roles/${role.id}/rights/${rightsId}`) 
      if(res.meta.status!==200) this.$message.error('删除失败')
      this.$message.success('删除用户成功')
      role.children = res.data
    },
    // 分配权限--------------------------------
  async showSetDialogVisible(role){
    this.roleId = role.id
    const{data:res} = await this.$http.get('rights/tree')
    if(res.meta.status!==200) this.$message.error('获取列表失败')
    console.log(res)
    this.rightsList = res.data
    this.getLeafKeys(role,this.defaultKeys)
    this.setDialogVisible = true
     },
     getLeafKeys(node,arr){
       if(!node.children) {
         return arr.push(node.id)
       }
       node.children.forEach(item=>{
         this. getLeafKeys(item,arr)
       })
     },
     closeSetDialog(){
       this.defaultKeys=[]
     },
     async saveSetRights(){
       const keys = [...this.$refs.treeRef.getCheckedKeys() , 
       ...this.$refs.treeRef.getHalfCheckedKeys()]
       console.log(keys)
       const idStr = keys.join(',')
       const{data:res} = await this.$http.post(`roles/${this.roleId}/rights`,{rids:idStr})
       if(res.meta.status!==200) return this.$message.error('更新失败')
       this.$message.success('更新成功')
       this.getRolesList()
       this.setDialogVisible = false
     }
    }
  }
</script>

<style lang="less" scoped>
.el-tag{
  margin: 7px;
}
.formCenter{
    display: flex;
    align-items: center;
}
</style>