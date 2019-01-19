import Vue from 'vue';
import Router from 'vue-router';
import Assort from '@/pages/assort/assort';
import Home from '@/pages/home/home';
import MyCenter from '@/pages/mycenter/mycenter';
import ShopCart from '@/pages/shopcart/shopcart';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/assort',
      name: 'Assort',
      component: Assort
    },{
      path: '/mycenter',
      name: 'MyCenter',
      component: MyCenter
    },{
      path: '/shopcart',
      name: 'ShopCart',
      component: ShopCart
    }
  ]
})
