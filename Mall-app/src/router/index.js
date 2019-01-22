import Vue from 'vue';
import Router from 'vue-router';
import ProductList from '@/pages/product-list/product-list';
import Home from '@/pages/home/home';
import MyCenter from '@/pages/mycenter/mycenter';
import ShopCart from '@/pages/shopcart/shopcart';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/product-list',
      component: ProductList
    },
    {
      path: '/mycenter',
      component: MyCenter
    },{
      path: '/shopcart',
      component: ShopCart
    }
  ]
})
