<template>
 <div>
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>订单管理</el-breadcrumb-item>
  <el-breadcrumb-item>订单列表</el-breadcrumb-item>
</el-breadcrumb>
<!-- 主体区域 -->
<el-card>
<!-- 搜索区域 -->
<el-row>
    <el-col :span="10">
        <el-input placeholder="请输入内容" >
 <el-button slot="append" icon="el-icon-search"></el-button>
 </el-input>
    </el-col>
</el-row>
 <!-- 订单区域 -->
 <el-table :data="orderList" border stripe>
<el-table-column label="#" type="index"></el-table-column>
     <el-table-column label="订单编号" prop="order_number"></el-table-column>
     <el-table-column label="订单价格" prop="order_price"></el-table-column>
     <el-table-column label="是否付款" prop="order_pay">
         <template slot-scope="scope">
          <el-tag v-if="scope.row.order_pay==='0'" type="danger">未付款</el-tag>
          <el-tag v-if="scope.row.order_pay==='1'" type="primary">已付款</el-tag>
         </template>
     </el-table-column>
     <el-table-column label="是否发货" prop="is_send"></el-table-column>
     <el-table-column label="创建时间" prop="create_time">
          <template slot-scope="scope">
              {{scope.row.create_time | dateFormat}}
            </template>
     </el-table-column>
     <el-table-column label="操作" >
         <el-button type="primary" size="mini" @click="showSetDialog"> <i class="el-icon-edit"></i></el-button>
         <el-button type="success" size="mini" @click="showLogDialogVisible"><i class="el-icon-location"></i></el-button>
     </el-table-column>
 </el-table>
 <!-- 分页区域 -->
 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>
<!-- 修改地址对话框 -->
<el-dialog title="修改地址" :visible.sync="setDialogVisible" width="50%">
<el-form :model="addressForm" :rules="addressFormRules" ref="addressFormRef" label-width="100px"  >
  <el-form-item label="活动名称" prop="address1">
    <el-cascader
    :options="cityData"
    v-model="addressForm.address1"
     :props="{ expandTrigger: 'hover' }"
    @change="handleChange"></el-cascader>
  </el-form-item>
    <el-form-item label="活动名称" prop="address2">
    <el-input v-model="addressForm.address2"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="setDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="setDialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
<!-- 物流信息对话框 -->
<el-dialog
  title="物流进度"
  :visible.sync="LogDialogVisible"
  width="50%">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="LogDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="LogDialogVisible = false">确 定</el-button>
      </span>
</el-dialog>
 </div>
</template>
<script>
import cityData from './citydata.js'

export default {
    data(){
        return{
  queryInfo:{
      query:'',
      pagenum:1,
      pagesize:10,
  },
   total: 0,
 orderList:[],
 setDialogVisible:false,
 LogDialogVisible:false,
 addressForm:{},
 addressFormRules:{
     address1:[],
     address2:[]
 },
 cityData,
 showProgressBox:[]
     }
  
    },
        created(){
    this.getOrderList()
    },
    methods:{
    async getOrderList(){
        const{data:res} = await this.$http.get('orders',{params:this.queryInfo})
        if(res.meta.status!==200) {return this.$message.error('获取列表失败')}
        console.log(res)
        this.$message.success('获取列表成功')
        this.orderList = res.data.goods
        this.total = res.data.total
    },
    handleSizeChange(newSize){
     this.queryInfo.pagesize = newSize
     this.getOrderList()
    },
    handleCurrentChange(newPage){
   this.queryInfo.pagenum = newPage
   this.getOrderList()
    },
    showSetDialog(){
  this.setDialogVisible=true
    },
    async showLogDialogVisible(){
    //  const{data:res} = await this.$http.get('/kuaidi/1106975712662')
    //  if(res.meta.status!==200) {return this.$message.error('获取物流失败')}
    //  this.$message.success('获取物流信息成功')
    //  this.showProgressBox = res.data
      this.LogDialogVisible = true
    }
   
    }
}
</script>

<style lang="less" scoped>

</style>
