import Vue from 'vue'
import VueRouter from 'vue-router'
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
import login from '../views/login.vue'
import contents from'../views/contents.vue'
import setIndex from'../views/setIndex.vue'
import setProduce from '../views/setProduce.vue'
import setExample from '../views/setExample.vue'
import setContact from '../views/setContact.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path:'/contents',
    name:'contents',
    component:contents,
    children:[
      {
        path:'setIndex',
        name:'setIndex',
        component:setIndex
      },
      {
        path:'setProduce',
        name:'setProduce',
        component:setProduce
      },
      {
        path:'setExample',
        name:'setExample',
        component:setExample
      },
      {
        path:'setContact',
        name:'setContact',
        component:setContact
      }

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
