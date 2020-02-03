<template>
    <div>            
        <editor
              v-if="contactDetail"
              :height="this.$store.state.clientHeight-75"
              :newContent="contactDetail"
              :uploadUrl="this.$store.state.uploadImg"
              v-on:editor-sure="editorSure($event)"
              v-on:editor-cancel="editorCancel"
            >
        </editor>
    </div>
</template>
<script>
import editor from "../components/wangeditor";
export default {
  components: {
    editor
  },
    data:function(){
        return{
            contactDetail:""
        }
    },
    methods:{
    editorSure: function(res) {
      this.contactDetail=res;
      let me = this;
      var params={};
      params.loginID=localStorage.getItem("loginID");
      params.loginTime=localStorage.getItem("loginTime");
      params.detail=me.contactDetail;
      this.$ajax
        .post("/service/setContact", params)
        .then(function(res) {
          if (res.data.result == "success") {
            localStorage.setItem("loginTime", res.data.loginTime);
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
    editorCancel: function() {
        
    }
    },
    created(){
    let me = this;
    this.$ajax
      .get("/service/getContact")
      .then(function(res) {
        if (res.data && res.data.length > 0) {
         me.contactDetail=res.data
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
}
</script>