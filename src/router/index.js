import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Setting from '../views/Setting.vue'
import WxAd from '../views/WxAd.vue'
import orderList from '../views/orderList.vue'


Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  // {
    // path: '/home',
    // name: 'Home',
    // component: Home,
    // children: [
      {
        path: '/Setting',
        name: 'Setting',
        component: Setting
      },
      {
        path: '/WxAd',
        name: 'WxAd',
        component: WxAd
      },
      {
        path: '/orderList',
        name: 'orderList',
        component: orderList
      }
    // ]
  // }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
