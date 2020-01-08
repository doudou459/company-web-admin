<template>
    <div>
      <div class="editorDiv" :style='{"height":height+"px"}' >
      <div ref="editorTool" class="editorTool">
          <el-button size="mini" plain type="success">确定</el-button>
          <el-button size="mini" plain type="info">返回</el-button>
      </div>
      <div ref="editor" class="editor"></div>
      </div>
    </div>
    
</template>

<script>
const Editor = require('wangeditor');
export default {
    props:{
        height:{
          type:Number,
          required:true,
          default: 200,
        }
    },
    data:function(){
      return{
          editorContent:""
      }  
    },
    mounted(){
     let editor = new Editor(this.$refs.editorTool,this.$refs.editor);
      editor.customConfig.menus=[ 
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'underline',  // 下划线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'justify',  // 对齐方式
            'image',  // 插入图片
            'table',  // 表格
            'undo',  // 撤销
            'redo'  // 重复
            ]   
     editor.customConfig.onchangeTimeout = 100;
    editor.customConfig.onchange = (html)=> {
       this.editorContent=html;
    }   
     editor.create();

    }
}
</script>

<style scoped>
.editorTool{
    padding-top: 5px;
    padding-bottom:5px;
    border-bottom-style:inset;
    border-bottom-width:1px;
    border-bottom-color: azure;
}
.editor{
    text-align: left;
}
.editorDiv{
    width: 600px;
    margin-left: auto;
    margin-right: auto;
    border-style: solid;
    border-width: 1px;
    border-color: black;
}
</style>