<template>
    <div>
      <div id="editorTool" class="editorTool"></div>
      <div id="editor" class="editor"></div>
    </div>
    
</template>

<script>
const Editor = require('wangeditor');
export default {
    mounted(){
     let editor = new Editor('#editorTool','#editor');
      editor.customConfig.menus=[ 
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'underline',  // 下划线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
             'list',  // 列表
            'justify',  // 对齐方式
            'image',  // 插入图片
            'table',  // 表格
            'undo',  // 撤销
            'redo'  // 重复
            ]     
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
</style>