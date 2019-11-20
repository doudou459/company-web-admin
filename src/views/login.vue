<template>
<div class="contentDiv">
  <div class="loginWeb">
    <el-form :model="user" label-width="50px" class="demo-ruleForm">
      <el-form-item label="账号" prop="loginID">
        <el-input v-model="user.loginID" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="loginKey">
        <el-input type="password" v-model="user.loginKey" autocomplete="off"></el-input>
      </el-form-item>
       <el-button type="primary"  @click="submitForm">登录</el-button>
    </el-form>
  </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data: function() {
    return {
      user: {
        loginID: "",
        loginKey: ""
      }
    }
  },
  methods:{
    submitForm:function(){
      console.log(this.user.loginID);
      console.log(this.$md5(this.user.loginKey));
    }
  }
}
</script>
<style scoped>
.contentDiv{
  height: 100%;
  min-height: 650px;
  display: flex;
  align-items: center; /*定义元素垂直居中*/
  justify-content: center; /*定义元素水平居中*/
}
.loginWeb{
  width: 100%;
  max-width: 500px;
  text-align: center;
  padding:50px 30px 30px 30px;
  background-color: azure;
  border-radius: 20px;
}


</style>
