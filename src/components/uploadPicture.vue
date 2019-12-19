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
      </div>
      </template>
      <script>
      export default {
          name:"uploadPicture",
          props:{
              //图片数据的dataModel对象（必须）
              "pictureData":{
                  type:Object,
                  required:true
              },
              //图片的下载地址（必须）
              "downloadUrl":{
                  type:String,
                  required:true,
              },
              //增加图片的方法（必须）
              "addData":{
                  type:Function,
                  required:true
              },
              //删除图片的方法（必须）
              "deleteData":{
                  type:Function,
                  required:true
              },
              //保存图片的方法（必须）
              "saveData":{
                  type:Function,
                  required:true
              },
              //顶部标题，有值则显示，无值则不显示
              "topTitle":{
                  type:String
              },
              //图片ID列的列名称（必须）
              "IDcolName":{
                  type:String,
                  required:true
              },
              //图片的标题列的列名称，有值则可显示和设置无值则不显示和设置
              "titleColName":{
                  type:String
              },
              //图片的储存地址的列名称（必须）
              "urlColName":{
                  type:String,
                  required:true
              },
              //是否要为图片设置显示平台（pc或m,即device数组）
              "showDevice":{
                  type:Boolean
              },
              //在showDevice为ture是需设置图片对应显示平台的列名称
              "showDeviceColName":{
                  type:String
              },
              //图片的显示高度（必须）
              "pictureHeigth":{
                  type:Number,
                  required:true
              }
              },
          data:function(){
              return{
              noPic: require("../assets/nopic.png"),
              deleteState:false,
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
              }
          },
          methods:{

          },
           created() {

           }
      }
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