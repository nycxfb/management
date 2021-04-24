<template>
    <div>
        <el-card>
     <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">
首页
</el-breadcrumb-item>
  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
  <el-breadcrumb-item>参数列表</el-breadcrumb-item>
</el-breadcrumb>
<el-alert
    title="只允许为第三级分类设置相关参数"
    type="warning"
    show-icon :closable="false">
  </el-alert>

<!-- 选择产品分类区域 -->
<el-row >
    <el-col>
        <span>选择商品分类</span>
  <el-cascader
    v-model="selectedCateKeys"
    :options="catelist"
    :props="cateProps"
    @change="handleChange"></el-cascader>
    </el-col>
</el-row>
<el-tabs v-model="activeName" @tab-click="handleTabClick">
    <el-tab-pane label="动态参数" name="many">
        <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addDialogVisible=true">添加参数</el-button>   
        <el-table :data="manyTableDate">
               <el-table-column type="index"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                   <el-button >编辑</el-button>
                   <el-button>删除</el-button>
                </template>
            </el-table-column>
            </el-table>  
        </el-tab-pane>
    <el-tab-pane label="静态属性" name="only">
        <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addDialogVisible=true">
            添加属性</el-button>
            <el-table :data="onlyTableDate">
               <el-table-column type="index"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                   <el-button >编辑</el-button>
                   <el-button>删除</el-button>
                </template>
            </el-table-column>
            </el-table>  
    </el-tab-pane>
  </el-tabs>
  <el-table>

  </el-table>
  </el-card>
  <!-- 对话框区域 -->
  <el-dialog :title="'添加'+ this.titleText" :visible.sync="addDialogVisible" width="50%" 
  @close="addDialogClosed">
 <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" >
  <el-form-item :label="titleText" prop="attr_name">
    <el-input v-model="addForm.attr_name"></el-input>
  </el-form-item>
  </el-form >
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addDialogVisible= false">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
             catelist:[],
             cateProps:{
                 value:'cat_id',
                 label:'cat_name',
                 children:'children',
                 expandTrigger: 'hover' 
             },
             selectedCateKeys:[],
             activeName:'many',
             manyTableDate:[],
             onlyTableDate:[],
             addDialogVisible:false,
             addForm:{
                  attr_name:''
             },
             addFormRules:{
                 attr_name: [{ required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
             },
        }
   
    },
    computed:{
        isBtnDisabled(){
            if(this.selectedCateKeys.length!==3)
            {return true}
              return false
        },
        catId(){
            if(this.selectedCateKeys.length==3){
                return this.selectedCateKeys[2]
            }
            return null
        },
        titleText(){
         if(this.activeName === 'many') 
         {return '动态参数'}
         return '静态属性'
        }, 
    },
    created(){
  this.getCatelist()
    },
    methods:{
      async getCatelist(){
          const{data:res} = await this.$http.get('categories', {params:{type:3}})
          if(res.meta.status!==200){return this.$message.error('获取失败')}
          this.$message.success('获取列表成功')
        this.catelist = res.data
          } ,
          async handleChange(){
              this.getParamsData()
          },
          handleTabClick(){
              console.log(this.activeName);
          this.getParamsData()
          },
         async getParamsData(){
              if(this.selectedCateKeys.length !==3){
            this.selectedCateKeys=[]
            return
        }
       const{data:res} = await this.$http.get(`categories/${this.catId}/attributes`,{params:{sel:this.activeName}})
       if(res.meta.status!==200){return this.$message.error('获取列表失败')}
       this.$message.success('获取信息成功')
       console.log(res.data)
       if(this.activeName==='many'){return this.manyTableDate = res.data}
       else{this.onlyTableDate=res.data}
          },
          addDialogClosed(){
              this.$refs.addFormRef.resetFields()
          }
    }
}
</script>
<style lang="less" scoped>
.el-row {
    margin: 15px 0;
}
.el-cascader{
    margin-left: 15px;
}
</style>

