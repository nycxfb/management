<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">
首页
</el-breadcrumb-item>
  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
  <el-breadcrumb-item>商品分类</el-breadcrumb-item>
</el-breadcrumb>
<el-card>
  <!-- 添加分类 -->
  <el-button type="primary" class="btn" @click="showAdddialogVisible">增加分类</el-button>
<el-dialog
  title="添加分类"
  :visible.sync="adddialogVisible"
  width="50%">
<el-form :model="addCateForm" :rules="addCateFormRules"   ref="addCateFormRef" label-width="100px" >
  <el-form-item label="分类名称" >
    <el-input v-model="addCateForm.cat_name" prop="cat_name"></el-input>
  </el-form-item>
      <el-form-item label="父级分类：">
          <el-cascader :options="parentCateList" :props="cascaderProps" 
          v-model="selectedKeys" @change="parentCateChanged"  clearable >
          </el-cascader>
        </el-form-item>
         
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="adddialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="adddialogVisible= false">确 定</el-button>
  </span>
</el-dialog>
<!-- 树形组件 -->
 <tree-table :data="catlist" :columns="columns" 
 :selection-type="false" :expand-type="false" :show-index="true" border :show-row-hover="false">
 <template slot="isok?" slot-scope="scope">
<i class="el-icon-success" v-if="scope.row.cat_deleted===false" style="color:green"></i>
<i class="el-icon-error" v-else style="color:green"></i>
</template>
 <template slot="level" slot-scope="scope">
 <el-tag v-if="scope.row.cat_level===0" type="primary">一级</el-tag>
  <el-tag v-else-if="scope.row.cat_level===1" type="warning">二级</el-tag>
   <el-tag v-else type="danger">三级</el-tag>
 </template>
 <template slot="order" >
   <el-button type="primary" size="mini"><i class="el-icon-edit" ></i>编辑</el-button>
      <el-button  type="danger" size="mini"><i class="el-icon-delete"></i>删除</el-button>
 </template>
 </tree-table>
 <!-- 分页区域 -->
 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 20,]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>
    </div>
</template>
<script>
export default {
    data(){
        return{
    catlist:[ ], 
      total:0,
      parentCateList:[],
    cascaderProps:{
      value:'"cat_id',
      chldren:'children',
      label:'cat_name',
      expandTrigger :"hover",
    },
    selectedKeys:[],
    columns:[{
      label:"分类名称",
      prop:"cat_name"
    },
  
       {
        label:"是否有效",
        type: 'template',
        template:'isok?'
      },
      {
       label:"等级",
        type: 'template',
        template:'level' 
      },
      {
        label:"操作",
        type:"template",
        template:"order"
      }],
      addform:{

      },
      addrules:{},
    currentPage1: 1,
     queryInfo:{
     type:3,
     pagenum: 1,
     pagesize: 5
     },
     adddialogVisible:false,
     addCateForm:{},
     addCateFormRules:{},
        }
       
    },
      created(){
     this.getcatlist()
    },
    methods:{
      // 商品列表数据---------------------------
      async getcatlist(){
           const{data:res} = await this.$http.get('categories',{params: this.queryInfo})
           if(res.meta.status!==200) {return this.$message.success('获取失败')}
           console.log(res)
           this.catlist = res.data.result
           this.total=res.data.total
       },
       handleSizeChange(newsize){
         this.queryInfo.pagesize = newsize
         this.getcatlist()
       },
       handleCurrentChange(newpage){
         this.queryInfo.pagenum = newpage
         this.getcatlist()
       },
       showAdddialogVisible(){
        this.getParentCateList()
         this.adddialogVisible = true
       },
      //  父级商品列表
       async getParentCateList(){
        const{data:res}= await this.$http.get('categories', {params:{type:2}})
      if(res.meta.status!==200) {return this.$message.error('获取列表失败')}
      console.log(res)
      this.$message.success('获取列表成功')
      this.parentCateList= res.data
       },
       parentCateChanged(){
    
       }
    }
}
</script>
<style lang="less" scoped>
.btn{
  margin-bottom: 10px;
}
.el-cascader {
  width: 100%;
}
</style>
