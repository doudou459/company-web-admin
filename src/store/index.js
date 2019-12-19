import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //记录屏幕的宽度和高度，用于页面布局和组件大小设置 
    clientWidth:document.documentElement.clientWidth,
    clientHeight:document.documentElement.clientHeight,
    //已在config中将service路径代理为后端的请求地址，即/service表示后端请求地址
    loginUrl:"/service/doLogin",//管理员登录请求地址
    getCarouselImg:"/service/getCarouselImgs",//获取轮播图数据请求地址
    getIndexImg:"/service/getIndexImgs",//获取首页图片数据请求地址
    downloadImg:"/service/downloadImg?fileName=",//下载图片的请求地址
    saveCarouselData:"/service/saveCarouselImg",//保存轮播图数据的请求地址
    saveIndexData:"/service/saveIndexImg"//保存首页图片数据的请求地址
  },
  mutations: {

  },
  actions: {
  },
  modules: {
  }
})
