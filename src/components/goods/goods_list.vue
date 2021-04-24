<template>
    <div>
       <el-card>
           <!-- 头部区域 -->
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
  <el-breadcrumb-item>商品列表</el-breadcrumb-item>
</el-breadcrumb>
<!-- 查询商品，添加商品 -->
<el-row :gutter="20">
    <el-col :span="8">
         <el-input placeholder="请输入内容" >
    <el-button slot="append" icon="el-icon-search"></el-button>
     </el-input>
    </el-col>

    <el-col :span="4">
    <el-button type="primary" @click="goAddPage">添加商品
     </el-button>
    </el-col>
</el-row>
<!-- 商品列表区域 -->
<el-table :data="goodsList" border stripe>
       <el-table-column type="index" label="#"></el-table-column>
     <el-table-column label="商品名称" prop="goods_name"></el-table-column>
      <el-table-column label="商品价格(元)" prop="goods_price"></el-table-column>
       <el-table-column label="商品重量" prop="goods_weight"></el-table-column>
        <el-table-column label="创建时间" prop="add_time">
            <template slot-scope="scope">
              {{scope.row.add_time | dateFormat}}
            </template>
        </el-table-column>
         <el-table-column label="操作">
             <el-button type="primary"><i class="el-icon-edit"></i></el-button>
               <el-button type="danger"><i class="el-icon-delete"></i></el-button>
             </el-table-column> 
</el-table>
       </el-card>
    </div>
</template>
<script>
export default {
    data(){
        return{
            goodsList:[],
            goods_name:'',
            queryInfo:{
                query:'',
                pagenum:'1',
                pagesize:'5'
            }
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        async getGoodsList(){
            const{data:res}= await this.$http.get('goods',{params:this.queryInfo})
            if(res.meta.status !==200 ) return this.$message.error('获取列表失败')
            this.$message.success('获取列表成功')
            console.log(res)
        this.goodsList=res.data.goods
        },
        goAddPage(){
            this.$router.push('/goods/add')
        }
    }
}
</script>