import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clientWidth:document.documentElement.clientWidth,
    clientHeight:document.documentElement.clientHeight,
    loginID:"",
    loginTime:"",
    loginUrl:"/service/doLogin",
    getCarouselImg:"/service/getCarouselImgs",
    getIndexImg:"/service/getIndexImgs",
    downloadImg:"/service/downloadImg?fileName=",
  },
  mutations: {
    setUser(state,user){
      state.loginID=user.loginID;
      state.loginTime = user.loginTime
    }
  },
  actions: {
  },
  modules: {
  }
})
