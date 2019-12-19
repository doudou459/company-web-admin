<template>
<div class="contentDiv" :style='{"height":this.$store.state.clientHeight+"px"}'>
  <div class="loginWeb">
    <el-form :model="user" label-width="50px" class="demo-ruleForm">
      <el-form-item label="账号" prop="loginID">
        <el-input v-model="user.loginID" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="loginKey">
        <el-input type="password" v-model="user.loginKey" autocomplete="off"></el-input>
      </el-form-item>
       <el-button type="success" @click="submitForm">登录</el-button>
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
      let me = this;
     this.$ajax.post(this.$store.state.loginUrl,{
       loginID:this.user.loginID,
       loginKey:this.$md5(this.user.loginKey)  
     }).then(function(res){
        if(res.data.result=="success"){
          localStorage.setItem("loginID",me.user.loginID);
          localStorage.setItem("loginTime",res.data.loginTime);
          me.$message({
          showClose: true,
          message: '登录成功',
          type: 'success'
        });
        me.$router.push("/contents/setIndex");
        }else if(res.data.result=="wrongKey"){
          me.$message({
          showClose: true,
          message: '密码错误'+res.data.wrongTime+"次",
          type: 'warning'
        });
        }else if(res.data.result=="wrongTimeFull"){
          me.$message({
          showClose: true,
          message: "密码连续错误5次，请明日再试",
          type: 'warning'
        });
        }else {
          me.$message({
          showClose: true,
          message: '账号错误',
          type: 'warning'
        });
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
}
</script>
<style scoped>
.contentDiv{
  display: flex;
  align-items: center; /*定义元素垂直居中*/
  justify-content: center; /*定义元素水平居中*/
}
.loginWeb{
  width: 100%;
  max-width: 360px;
  text-align: center;
  padding:50px 30px 30px 30px;
  background-color:cadetblue;
  border-radius: 20px;
}


</style>
