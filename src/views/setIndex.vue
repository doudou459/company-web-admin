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
          <el-row :gutter="10" class="imgTitleRow">
            <el-col :span="18">
              <el-row>
                <el-col class="inputSpan" :span="3">
                  <span>标题：</span>
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
              <el-button
                icon="el-icon-close"
                size="mini"
                circle
                class="deleteBtn"
                @click="deleteCarouselImg(item.ID)"
              ></el-button>
            </el-col>
          </el-row>
          <el-upload
            action="/service/uploadImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="pictureImg"
          >
            <el-image
              class="carousel_img"
              :src="(item.url&&item.url!='none')?downloadUrl+item.url:noPic"
              @click="getOwnerID(item.ID,1)"
              fit="cover"
            ></el-image>
          </el-upload>
        </el-col>
      </el-row>
      <div class="topDiv">
        <h3>设置主页图</h3>
        <el-row type="flex">
          <el-col :span="4">
            <el-button @click="addIndexImg" type="primary">新增</el-button>
            <el-button @click="deleteIndexImgs=deleteIndexImgs?false:true" type="warning">删除</el-button>
            <el-button @click="saveIndexImgs" type="info">保存</el-button>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="20">
        <el-col v-for="item in index_img.datas" v-bind:key="item.ID" :span="8">
          <el-row :gutter="10" class="imgTitleRow">
            <el-col class="inputSpan" :span="3">
              <span>标题：</span>
            </el-col>
            <el-col :span="19">
              <el-input v-model="item.title" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="2" v-show="deleteIndexImgs">
              <el-button
                icon="el-icon-close"
                size="mini"
                circle
                class="deleteBtn"
                @click="deleteIndexImg(item.ID)"
              ></el-button>
            </el-col>
          </el-row>
          <el-upload
            action="/service/uploadImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="pictureImg"
          >
            <el-image
              class="index_img"
              :src="(item.url&&item.url!='none')?downloadUrl+item.url:noPic"
              @click="getOwnerID(item.ID,2)"
              fit="cover"
            ></el-image>
          </el-upload>
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
      noPic: require("../assets/nopic.png"),
      carousel_img: new this.$dataModel(
        ["ID", "showType", "title", "url"],
        "ID"
      ),
      index_img: new this.$dataModel(["ID", "title", "url"], "ID"),
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
      deleteCarousel: false,
      deleteIndexImgs: false,
      operateObject: { ID: "", key: 1 },
      downloadUrl: this.$store.state.downloadImg
    };
  },
  methods: {
    addCarousel: function() {
      let newImg = {
        ID: new Date().getTime(),
        showType: "pc",
        title: "",
        url: ""
      };
      this.carousel_img.newData(newImg, 0);
    },
    deleteCarouselImg: function(ID) {
      this.carousel_img.deleteByID(ID);
    },
    addIndexImg: function() {
      let newImg = {
        ID: new Date().getTime(),
        title: "",
        url: ""
      };
      this.index_img.newData(newImg, 0);
    },
    deleteIndexImg: function(ID) {
      this.index_img.deleteByID(ID);
    },
    saveCarousels: function() {
      let me = this;
      if (me.carousel_img.getChangedData() == "") {
        return;
      }
      this.$ajax
        .post(this.$store.state.saveCarouselData, {
          loginID: localStorage.getItem("loginID"),
          loginTime: localStorage.getItem("loginTime"),
          carouselData: me.carousel_img.getChangedData()
        })
        .then(function(res) {
          if (res.data.result == "success") {
            localStorage.setItem("loginTime", res.data.loginTime);
            me.carousel_img.acceptChanges();
            me.$message({
              showClose: true,
              message: "保存成功",
              type: "success"
            });
          } else if (res.data.result == "fail") {
            localStorage.setItem("loginTime", res.data.loginTime);
            me.$message({
              showClose: true,
              message: "保存失败",
              type: "error"
            });
          } else {
            me.$message({
              showClose: true,
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          me.$message({
            showClose: true,
            message: error,
            type: "error"
          });
        });
    },
    saveIndexImgs: function() {
      let me = this;
      if (me.index_img.getChangedData() == "") {
        return;
      }
      this.$ajax
        .post(this.$store.state.saveIndexData, {
          loginID: localStorage.getItem("loginID"),
          loginTime: localStorage.getItem("loginTime"),
          indexImgData: me.index_img.getChangedData()
        })
        .then(function(res) {
          if (res.data.result == "success") {
            localStorage.setItem("loginTime", res.data.loginTime);
            me.index_img.acceptChanges();
            me.$message({
              showClose: true,
              message: "保存成功",
              type: "success"
            });
          } else if (res.data.result == "fail") {
            localStorage.setItem("loginTime", res.data.loginTime);
            me.$message({
              showClose: true,
              message: "保存失败",
              type: "error"
            });
          } else {
            me.$message({
              showClose: true,
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          me.$message({
            showClose: true,
            message: error,
            type: "error"
          });
        });
    },
    handleAvatarSuccess: function(res) {
      if (this.operateObject.key == 1) {
        this.carousel_img.setValueByID("url", res, this.operateObject.ID);
      } else if (this.operateObject.key == 2) {
        this.index_img.setValueByID("url", res, this.operateObject.ID);
      }
    },
    beforeAvatarUpload: function(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或 png 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return isJPG && isLt5M;
    },
    getOwnerID: function(ID, n) {
      this.operateObject.ID = ID;
      this.operateObject.key = n;
    }
  },
  created() {
    let me = this;
    this.$ajax
      .get(this.$store.state.getCarouselImg)
      .then(function(res) {
        if (res.data && res.data.length > 0) {
          me.carousel_img.loadData(res.data);
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
        if (res.data && res.data.length > 0) {
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
  cursor: pointer;
  width: 100%;
  height: 240px;
  display: block;
  margin-top: 5px;
  margin-bottom: 10px;
  border-radius: 20px;
}

.index_img {
  cursor: pointer;
  width: 100%;
  height: 300px;
  margin-top: 5px;
  margin-bottom: 10px;
  display: block;
  border-radius: 20px;
}
.deviceSelect {
  width: 100px;
  float: left;
}
.inputSpan {
  padding-top: 8px;
  text-align: right;
}
.imgTitleRow {
  margin-top: 10px;
}
.carousel_imgRow {
  border-bottom-style: inset;
  border-bottom-width: 5px;
  /* max-height: 600px;
    overflow-y: scroll; */
  border-bottom-color: #545c64;
}
.deleteBtn {
  margin-top: 5px;
  margin-left: 10px;
  color: red !important;
  font-size: 14px;
  background-color: #e9eef3;
  border: #e9eef3;
}
.deleteBtn:active,
.deleteBtn:hover {
  background-color: orange;
}
</style>