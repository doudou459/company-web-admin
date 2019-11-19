<template>
  <div class="loginWeb">
    <el-form :model="user" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="loginID">
        <el-input v-model="user.loginID" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="loginKey">
        <el-input type="password" v-model="user.loginKey" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('user')">登录</el-button>
      </el-form-item>
    </el-form>
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
  }
}
</script>
