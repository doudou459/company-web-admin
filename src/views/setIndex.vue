<template>
  <el-container>
    <el-main>
        <uploadPicture  
        dataName="carouselData" 
        :labelArray="labelArray1" 
        :downloadUrl="this.$store.state.downloadImg" 
        :getDataUrl="this.$store.state.getCarouselImg"
        :saveDataUrl="this.$store.state.saveCarouselData"
        topTitle="设置轮播图"
        IDcolName="ID"
        titleColName="title"
        urlColName="url"
        :showDevice="true"
        showDeviceColName="showType"
        :pictureHeight="240"
         > 
        </uploadPicture>
        <uploadPicture  
        dataName="indexImgData" 
        :labelArray="labelArray2" 
        :downloadUrl="this.$store.state.downloadImg" 
        :getDataUrl="this.$store.state.getIndexImg"
        :saveDataUrl="this.$store.state.saveIndexData"
        topTitle="设置主页图"
        IDcolName="ID"
        titleColName="title"
        urlColName="url"
        :showDevice="false"
        :pictureHeight="270"
         > 
        </uploadPicture>
    </el-main>
  </el-container>
</template>
<script>
import uploadPicture from "../components/uploadPicture";
export default {
  name: "setIndex",
  data: function() {
    return {
        labelArray1:["ID", "showType", "title", "url"],
        labelArray2:["ID",  "title", "url"],
    };
  },
  components: {
    uploadPicture
  }

};
</script>