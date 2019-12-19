      <template>
  <div>
    <div class="topDiv">
      <h3 v-if="topTitle!=null&&topTitle!=''">{{topTitle}}</h3>
      <el-row type="flex">
        <el-col :span="4">
          <el-button @click="addData" type="primary">新增</el-button>
          <el-button @click="deleteState=deleteState?false:true" type="warning">删除</el-button>
          <el-button @click="saveData" type="info">保存</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="20" class="imgRow">
      <el-col v-for="item in pictureData.datas" v-bind:key="item[IDcolName]" :span="8">
        <el-row :gutter="10" class="imgTitleRow">
          <el-col :span="showDevice?18:22">
            <el-row v-if="titleColName!=null&&titleColName!=''">
              <el-col class="inputSpan" :span="3">
                <span>标题：</span>
              </el-col>
              <el-col :span="21">
                <el-input v-model="item[titleColName]" placeholder="请输入内容"></el-input>
              </el-col>
            </el-row>
          </el-col>
          <el-col v-if="showDevice" :span="4">
            <el-select v-model="item[showDeviceColName]" placeholder="请选择" class="deviceSelect">
              <el-option v-for="op in device" :key="op.value" :label="op.label" :value="op.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" v-show="deleteState">
            <el-button
              icon="el-icon-close"
              size="mini"
              circle
              class="deleteBtn"
              @click="deleteData(item[IDcolName])"
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
            class="c_img"
            :src="getImgUrl(item[urlColName])"
            @click="getOwnerID(item[IDcolName])"
            fit="cover"
            :style='{"height":pictureHeight+"px"}'
          ></el-image>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>
      <script>
export default {
  name: "uploadPicture",
  props: {
    //pictureData的名称（必须）
    dataName:{
      type: String,
      required: true
    },
    //数据的列数组（字段名称数组）（必须）
    labelArray: {
      type: Array,
      required: true
    },
    //图片的下载地址（必须）
    downloadUrl: {
      type: String,
      required: true
    },
   //获取数据地址（必须）
    getDataUrl: {
      type: String,
      required: true
    },
    //数据保存地址（必须）
    saveDataUrl: {
      type: String,
      required: true
    },
    //顶部标题，有值则显示，无值则不显示
    topTitle: {
      type: String
    },
    //图片ID列的列名称（必须）
    IDcolName: {
      type: String,
      required: true
    },
    //图片的标题列的列名称，有值则可显示和设置无值则不显示和设置
    titleColName: {
      type: String
    },
    //图片的储存地址的列名称（必须）
    urlColName: {
      type: String,
      required: true
    },
    //是否要为图片设置显示平台（pc或m,即device数组）
    showDevice: {
      type: Boolean
    },
    //在showDevice为ture是需设置图片对应显示平台的列名称
    showDeviceColName: {
      type: String
    },
    //图片的显示高度（必须）
    pictureHeight: {
      type: Number,
      required: true
    }
  },
  data: function() {
    return {
      noPic: require("../assets/nopic.png"),
      deleteState: false,
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
      pictureData: new this.$dataModel(this.labelArray, this.IDcolName),
      opreateID:""
    };
  },
  methods: {
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
      this.pictureData.setValueByID(this.urlColName, res, this.opreateID);
    },
    addData:function(){
      let newImg = {};
      newImg[this.IDcolName]=new Date().getTime();
      newImg[this.urlColName]="";
      if(this.titleColName){
           newImg[this.titleColName]="";
      }
      if(this.showDevice){
         newImg[this.showDeviceColName]="pc";
      }
      this.pictureData.newData(newImg, 0);
    },
    deleteData:function(ID){
    this.pictureData.deleteByID(ID);
    },
    saveData:function(){
      let me = this;
      if (me.pictureData.getChangedData() == "") {
        return;
      }
      var params={};
      params.loginID=localStorage.getItem("loginID");
      params.loginTime=localStorage.getItem("loginTime");
      params[this.dataName]=me.pictureData.getChangedData()
      this.$ajax
        .post(this.saveDataUrl, params)
        .then(function(res) {
          if (res.data.result == "success") {
            localStorage.setItem("loginTime", res.data.loginTime);
            me.pictureData.acceptChanges();
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
    getOwnerID:function(ID){
          this.opreateID=ID;
    },
    getImgUrl:function(fileName){
      if(fileName&&fileName!="none"){
        return this.downloadUrl+fileName
      }else{
         return this.noPic
      }
    }
  },
    created() {
    let me = this;
    this.$ajax
      .get(this.getDataUrl)
      .then(function(res) {
        if (res.data && res.data.length > 0) {
          me.pictureData.loadData(res.data);
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
.c_img {
  cursor: pointer;
  width: 100%;
  display: block;
  margin-top: 5px;
  margin-bottom: 10px;
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
.imgRow {
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