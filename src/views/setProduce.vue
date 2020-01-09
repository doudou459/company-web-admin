<template>
  <el-container>
    <el-main>
    <div>
      <div class="topDiv">
        <h3>设置产品与服务</h3>
      <el-row type="flex">
        <el-col :span="4">
          <el-button @click="addData" type="primary">新增</el-button>
          <el-button @click="deleteState=deleteState?false:true" type="warning">删除</el-button>
          <el-button @click="saveData" type="info">保存</el-button>
        </el-col>
      </el-row>
    </div>
    </div>
        </el-main>
  </el-container>
</template>
<script>
import editor from "../components/wangeditor"
export default {
  components: {
    editor
  },
  data:function(){
    return{
     deleteState:false,
    }
  },
  methods:{
   addData:function(){

   },
   saveData:function(){

   }
  },
  created(){

  }
}
</script>
<style scoped>
.topDiv {
  text-align: left;
  border-bottom-color: cadetblue;
  border-bottom-style: inset;
  border-bottom-width: 3px;
  padding-bottom: 10px;
}
</style>