<template>
  <el-container>
    <el-main>
      <div>
        <div class="topDiv">
          <h3>设置在线体验</h3>
          <el-row type="flex">
            <el-col :span="4">
              <el-button @click="addData" type="primary">新增</el-button>
              <el-button @click="deleteState=deleteState?false:true" type="warning">删除</el-button>
              <el-button @click="saveData" type="info">保存</el-button>
            </el-col>
          </el-row>
          <el-drawer size="40%" :show-close="false" :visible.sync="drawer" :with-header="false">
            <editor
              v-if="drawer"
              :height="this.$store.state.clientHeight-10"
              :newContent="editContent"
              :uploadUrl="this.$store.state.uploadImg"
              v-on:editor-sure="editorSure($event)"
              v-on:editor-cancel="editorCancel"
            ></editor>
          </el-drawer>
          <el-row :gutter="20" class="itemRow">
            <el-col v-for="item in myDemoData.datas" v-bind:key="item.ID" :span="8">
              <el-button
                v-if="deleteState"
                icon="el-icon-close"
                size="mini"
                circle
                class="deleteBtn"
                @click="deleteData(item.ID)"
              ></el-button>
              <el-button @click="openEditor(item.ID)" type="info" round size="mini">详细内容</el-button>
                  <el-upload
                    action="/service/uploadImg"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    name="pictureImg"
                  >
                    <el-image
                      class="c_img"
                      :src="getImgUrl(item.pictureUrl)"
                      @click="getOwnerID(item.ID)"
                      fit="cover"
                      :style="{'height':'240px'}"
                    ></el-image>
                  </el-upload>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import editor from "../components/wangeditor";
export default {
  components: {
    editor
  },
  data: function() {
    return {
      deleteState: false,
      myDemoData: new this.$dataModel(
        ["ID", "title", "pictureUrl", "detail"],
        "ID"
      ),
      opreateID: "",
      noPic: require("../assets/nopic.png"),
      drawer: false,
      editContent: "",
      editID: ""
    };
  },
  methods: {
    addData: function() {
      let newImg = {};
      newImg.ID = new Date().getTime();
      newImg.pictureUrl = "";
      this.myDemoData.newData(newImg, 0);
    },
    saveData: function() {
      let me = this;
      if (me.myDemoData.getChangedData() == "") {
        return;
      }
      var params={};
      params.loginID=localStorage.getItem("loginID");
      params.loginTime=localStorage.getItem("loginTime");
      params.mydemoData=me.myDemoData.getChangedData()
      this.$ajax
        .post("/service/saveMydemo", params)
        .then(function(res) {
          if (res.data.result == "success") {
            localStorage.setItem("loginTime", res.data.loginTime);
            me.myDemoData.acceptChanges();
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
    deleteData: function(ID) {
      this.myDemoData.deleteByID(ID);
    },
    getOwnerID: function(ID) {
      this.opreateID = ID;
    },
    getImgUrl: function(fileName) {
      if (fileName && fileName != "none") {
        return this.$store.state.downloadImg + fileName;
      } else {
        return this.noPic;
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
    handleAvatarSuccess: function(res) {
      this.myDemoData.setValueByID("pictureUrl", res, this.opreateID);
    },
    openEditor: function(ID) {
      this.editContent = this.myDemoData.getValueByID("detail", ID);
      this.editID = ID;
      this.drawer = true;
    },
    editorSure: function(res) {
      this.myDemoData.setValueByID("detail", res, this.editID);
      this.drawer = false;
    },
    editorCancel: function() {
      this.drawer = false;
    }
  },
  created() {
    let me = this;
    this.$ajax
      .get("/service/getMydemo")
      .then(function(res) {
        if (res.data && res.data.length > 0) {
          me.myDemoData.loadData(res.data);
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
<style scoped>
.topDiv {
  text-align: left;
  border-bottom-color: cadetblue;
  border-bottom-style: inset;
  border-bottom-width: 3px;
  padding-bottom: 10px;
}
.deleteBtn {
  margin-left: 10px;
  color: red !important;
  background-color: #e9eef3;
  border: #e9eef3;
}
.deleteBtn:active,
.deleteBtn:hover {
  background-color: orange;
}

.c_img {
  cursor: pointer;
  width: 100%;
  display: block;
  margin-top: 5px;
  margin-bottom: 10px;
  border-radius: 20px;
}
.itemRow {
  margin-top: 10px;
}
</style>