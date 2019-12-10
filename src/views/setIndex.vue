<template>
  <el-container>
    <el-main>
      <div class="topDiv">
        <h3>设置轮播图</h3>
        <el-row type="flex">
          <el-col :span="4">
            <el-button type="primary">新增</el-button>
            <el-button type="warning">删除</el-button>
            <el-button type="info">保存</el-button>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="20" class="carousel_imgRow">
        <el-col v-for="item in carousel_img" v-bind:key="item.ID" :span="8">    
          <el-row :gutter="10" class="imgTitleRow" >
            <el-col :span="18">
              <el-row>
                <el-col class="inputSpan" :span="3">
                 <span >标题：</span>
                </el-col>
                <el-col :span="21">
                  <el-input v-model="item.title" placeholder="请输入内容"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6">
              <el-select v-model="item.showType" placeholder="请选择" class="deviceSelect">
                <el-option v-for="op in device" :key="op.value" :label="op.label" :value="op.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
           <el-image class="carousel_img" :src="item.url" fit="cover"></el-image>
        </el-col>
      </el-row>
     <div class="topDiv">
        <h3>设置主页图</h3>
        <el-row type="flex">
          <el-col :span="4">
            <el-button type="primary">新增</el-button>
            <el-button type="warning">删除</el-button>
            <el-button type="info">保存</el-button>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="20" >
        <el-col v-for="item in index_img" v-bind:key="item.ID" :span="8">    
          <el-row :gutter="10" class="imgTitleRow" >
                <el-col class="inputSpan" :span="3">
                 <span >标题：</span>
                </el-col>
                <el-col :span="21">
                  <el-input v-model="item.title" placeholder="请输入内容"></el-input>
                </el-col>
              </el-row>
           <el-image class="index_img" :src="item.url" fit="cover"></el-image>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: "setIndex",
  data: function() {
    return {
      carousel_img: [],
      index_img: [],
      device: [
        {
          value: "pc",
          label: "电脑端"
        },
        {
          value: "m",
          label: "移动端"
        }
      ]
    };
  },
  created() {
    let me = this;
    this.$ajax
      .get(this.$store.state.getCarouselImg)
      .then(function(res) {
        if (res.data) {
          me.carousel_img = res.data;
        }
      })
      .catch(function(error) {
        me.$message({
          showClose: true,
          message: error,
          type: "error"
        });
      });
    this.$ajax
      .get(this.$store.state.getIndexImg)
      .then(function(res) {
        if (res.data) {
          me.index_img = res.data;
        }
      })
      .catch(function(error) {
        me.$message({
          showClose: true,
          message: error,
          type: "error"
        });
      });
  }
};
</script>
<style  scoped>
.topDiv {
  text-align: left;
  border-bottom-color: cadetblue;
  border-bottom-style: inset;
  border-bottom-width: 3px;
  padding-bottom: 10px;
}
.carousel_img {
  width: 100%;
  height: 240px;
  margin-top:5px;
  margin-bottom: 10px;
  display: block;
}
.index_img{
  width: 100%;
  height: 300px;
  margin-top:5px;
  margin-bottom: 10px;
  display: block;   
}
.deviceSelect {
  width: 100px;
  float: left;
}
.inputSpan{
     padding-top:8px;
     text-align: right;
}
.imgTitleRow{
    margin-top:10px;
}
.carousel_imgRow{
    border-bottom-style: inset;
    border-bottom-width: 5px;
    /* max-height: 600px;
    overflow-y: scroll; */
    border-bottom-color:#545c64;
}
</style>