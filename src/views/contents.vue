<template>
<el-container>
  <el-aside width="200px"  :style='{"height":this.$store.state.clientHeight+"px"}'>
<el-menu
  :default-active="router"
  class="el-menu-demo"
  mode="vertical"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b"
  router
  :style='{"height":this.$store.state.clientHeight+"px"}'>
  <el-menu-item  v-for="item in navigation" v-bind:key="item.name" v-on:click="setTitle(item.name,item.router)"  v-bind:index="item.router">{{item.name}}</el-menu-item>
</el-menu>

  </el-aside>
  <el-main :style='{"height":this.$store.state.clientHeight+"px"}'>
    <el-header>{{titleName}}</el-header>
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
          router:"/contents/setIndex"
        },
        {
          name:"产品服务",
          router:"/contents/setProduce" 
        },
        {
          name:"在线体验",
          router:"/contents/setExample"  
        },
        {
          name:"联系方式",
          router:"/contents/setContact"  
        }
      ],
      titleName:"首页图片",
      router:"/contents/setIndex"
    }
  },
  methods:{
    setTitle:function(titleName,router){
     this.titleName=titleName;
     this.router=router;
    }
  },
  created(){
    this.router=this.$route.path;
    switch(this.router){
    case "/contents/setIndex" :
      this.titleName = "首页图片";
      break;
    case "/contents/setProduce" :
      this.titleName = "产品服务";
      break;
    case "/contents/setExample" :
      this.titleName = "在线体验"; 
      break;
    case "/contents/setContact" :
      this.titleName = "联系方式"; 
      break;
    default:    
      this.router= "/contents/setIndex";  
      this.titleName = "首页图片"; 
      break;
    }
     
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
    background-color: #545c64;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
  }
</style>