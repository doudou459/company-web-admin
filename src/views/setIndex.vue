<template>
  <el-container>
    <el-main>
      <div class="topDiv">
        <h3>设置轮播图</h3>
        <el-row type="flex">
          <el-col :span="4">
            <el-button @click="addCarousel" type="primary">新增</el-button>
            <el-button @click="deleteCarousel=deleteCarousel?false:true" type="warning">删除</el-button>
            <el-button @click="saveCarousels" type="info">保存</el-button>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="20" class="carousel_imgRow">
        <el-col v-for="item in carousel_img.datas" v-bind:key="item.ID" :span="8">    
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
            <el-col :span="4">
              <el-select v-model="item.showType" placeholder="请选择" class="deviceSelect">
                <el-option v-for="op in device" :key="op.value" :label="op.label" :value="op.value"></el-option>
              </el-select>
            </el-col>
            <el-col :span="2" v-show="deleteCarousel">
              <el-button icon="el-icon-close"   size="mini" circle class="deleteBtn" @click="deleteCarouselImg(item.ID)" ></el-button>
            </el-col>
          </el-row>
           <el-image class="carousel_img" :src="item.url" fit="cover"></el-image>
        </el-col>
      </el-row>
     <div class="topDiv">
        <h3>设置主页图</h3>
        <el-row type="flex">
          <el-col :span="4">
            <el-button @click="addIndexImg" type="primary">新增</el-button>
            <el-button @click="deleteIndexImgs=deleteIndexImgs?false:true" type="warning">删除</el-button>
            <el-button type="info">保存</el-button>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="20" >
        <el-col v-for="item in index_img.datas" v-bind:key="item.ID" :span="8">    
          <el-row :gutter="10" class="imgTitleRow" >
                <el-col class="inputSpan" :span="3">
                 <span >标题：</span>
                </el-col>
                <el-col :span="19">
                  <el-input v-model="item.title" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="2" v-show="deleteIndexImgs">
              <el-button icon="el-icon-close"   size="mini" circle class="deleteBtn" @click="deleteIndexImg(item.ID)" ></el-button>
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
      carousel_img: new this.$dataModel(["ID","showType","title","url"],"ID"),
      index_img: new this.$dataModel(["ID","title","url"],"ID"),
      device: [
        {
          value: "pc",
          label: "电脑端"
        },
        {
          value: "m",
          label: "移动端"
        }
      ],
      deleteCarousel:false,
      deleteIndexImgs:false,
    };
  },
  methods:{
    addCarousel:function(){
      let newImg = {
        "ID":new Date().getTime(),
        "showType":"pc",
        "title":"",
        "url":""
      }
      this.carousel_img.newData(newImg,0);
    },
    deleteCarouselImg:function(ID){
    this.carousel_img.deleteByID(ID);

    },
    addIndexImg:function(){
      let newImg = {
        "ID":new Date().getTime(),
        "title":"",
        "url":""
      }
      this.index_img.newData(newImg,0);
    },
    deleteIndexImg:function(ID){
      this.index_img.deleteByID(ID);
    },
    saveCarousels:function(){
       console.log(this.carousel_img.getChangedData())
    }
  },
  created() {
    let me = this;
    this.$ajax
      .get(this.$store.state.getCarouselImg)
      .then(function(res) {
        if (res.data) {
          me.carousel_img.loadData( res.data);
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
          me.index_img.loadData(res.data);
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
.deleteBtn{
  margin-top:5px;
  margin-left: 10px;
  color: red!important;
  font-size: 14px;
  background-color:#E9EEF3;
  border: #E9EEF3;
}
.deleteBtn:active,.deleteBtn:hover{
  background-color:orange;
}
</style>