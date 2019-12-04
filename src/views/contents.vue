<template>
<el-container>
  <el-aside width="200px"  :style='{"height":this.$store.state.clientHeight+"px"}'>
<el-menu
  default-active="setIndex"
  class="el-menu-demo"
  mode="vertical"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b"
  router="true">
  <el-menu-item  v-for="item in navigation" v-bind:key="item.name"  v-bind:index="item.router">{{item.name}}</el-menu-item>
</el-menu>

  </el-aside>
  <el-main :style='{"height":this.$store.state.clientHeight+"px"}'>
    <el-header>Header</el-header>
    <router-view></router-view>
  </el-main>
</el-container>
</template>
<script>
export default {
  name: "contents",
  data: function() {
    return {
      navigation:[
        {
          name:"首页图片",
          router:"setIndex"
        },
        {
          name:"产品服务",
          router:"setProduce" 
        },
        {
          name:"在线体验",
          router:"setExample"  
        },
        {
          name:"联系方式",
          router:"setContact"  
        }
      ]
    }
  },
  methods:{

  }
}
</script>

<style scoped>
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    height: 100%;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 100%;
    padding:0px;
  }

    .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
</style>