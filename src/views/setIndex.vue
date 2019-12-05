<template>
<el-container>
    <el-main>
<el-row type='flex'>
    <el-col :span='4'>
        <el-button type="primary">新增</el-button>     <el-button type="warning">删除</el-button>     <el-button type="info">保存</el-button>
    </el-col>
</el-row>
<el-row :gutter="20" type='flex'>
    <el-col :span='8'>
        
    </el-col>
</el-row>
</el-main>
</el-container>
</template>
<script>
export default {
    name:"setIndex",
    data:function(){
        return{
            carousel_img:[],
            index_img:[]
        }
    },
    created(){
    let me = this;
     this.$ajax.get(this.$store.state.getCarouselImg).then(function(res){
       if(res.data){
           console.log(res.data[0])
           console.log(res.data[0].ID)//后端自动小写了？？？
       }
     }).catch(function(error){
          me.$message({
          showClose: true,
          message: error,
          type: 'error'
        });
     })        
    }
}
</script>
<style  scoped>

</style>