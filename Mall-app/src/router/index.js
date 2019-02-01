import Vue from 'vue';
import Router from 'vue-router';
import ProductList from 'pages/product-list/product-list';
import Home from 'pages/home/home';
import MyCenter from 'pages/mycenter/mycenter';
import ShopCart from 'pages/shopcart/shopcart';
import ProductDetail from 'pages/product-detail/product-detail';
import Login from 'pages/login/login';
import Register from 'pages/register/register';
import FindPwd from 'pages/find-pwd/find-pwd';
import Order from 'pages/order/order';
import Settlement from 'pages/settlement/settlement';
import AddAddress from 'pages/add-address/add-address';
import PersonInfo from 'pages/person-info/person-info';
import UpdatePwd from 'pages/update-pwd/update-pwd';
import Intro from 'pages/intro/intro';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: ':id',
          component: ProductDetail
        }
      ]
    },
    {
      path: '/product-list',
      name: 'product-list',
      component: ProductList,
      children: [
        {
          path: ':id',
          name: 'detail',
          component: ProductDetail
        }
      ]
    },
    {
      path: '/mycenter',  // 个人中心
      name: 'mycenter',
      component: MyCenter,
      children: [
        {
          path: '/mycenter/person-info',
          component: PersonInfo,
          meta: {
            requireAuth: true
          }
        }, {
          path: '/mycenter/update-pwd',
          component: UpdatePwd,
          meta: {
            requireAuth: true
          }
        }, {
          path: '/mycenter/intro',
          component: Intro
        }
      ]
    },
    {
      path: '/shopcart',  // 购物车
      name: 'shopcart',
      component: ShopCart,
      meta: {
        requireAuth: true
      }
    }, 
    {
      path: '/login',  // 登录
      name: 'login',
      component: Login
    },
    {
      path: '/register',  // 注册
      component: Register
    },
    {
      path: '/find-pwd',  // 找回密码
      name: 'find-pwd',
      component: FindPwd
    }, {
      path: '/order',  // 订单
      name: 'order',
      component: Order,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/settlement',  // 确认订单页
      name: 'settlement',
      component: Settlement,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/add-address',  // 添加地址
      name: 'add-address',
      component: AddAddress,
      meta: {
        requireAuth: true
      }
    }
  ]
})