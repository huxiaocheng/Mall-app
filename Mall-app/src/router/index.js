import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

const ProductList = (resolve => {
  import('pages/product-list/product-list').then(module => {
    resolve(module)
  })
})

const Home = (resolve => {
  import('pages/home/home').then(module => {
    resolve(module)
  })
})

const MyCenter = (resolve => {
  import('pages/mycenter/mycenter').then(module => {
    resolve(module)
  })
})

const ShopCart = (resolve => {
  import('pages/shopcart/shopcart').then(module => {
    resolve(module)
  })
})

const ProductDetail = (resolve => {
  import('pages/product-detail/product-detail').then(module => {
    resolve(module)
  })
})

const Login = (resolve => {
  import('pages/login/login').then(module => {
    resolve(module)
  })
})

const Register = (resolve => {
  import('pages/register/register').then(module => {
    resolve(module)
  })
})

const FindPwd = (resolve => {
  import('pages/find-pwd/find-pwd').then(module => {
    resolve(module)
  })
})

const Order = (resolve => {
  import('pages/order/order').then(module => {
    resolve(module)
  })
})

const Settlement = (resolve => {
  import('pages/settlement/settlement').then(module => {
    resolve(module)
  })
})

const AddAddress = (resolve => {
  import('pages/add-address/add-address').then(module => {
    resolve(module)
  })
})

const PersonInfo = (resolve => {
  import('pages/person-info/person-info').then(module => {
    resolve(module)
  })
})

const UpdatePwd = (resolve => {
  import('pages/update-pwd/update-pwd').then(module => {
    resolve(module)
  })
})

const Intro = (resolve => {
  import('pages/Intro/Intro').then(module => {
    resolve(module)
  })
})

const Pay = (resolve => {
  import('pages/pay/pay').then(module => {
    resolve(module)
  })
})

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
      component: Login,
      beforeEnter: (to, from, next) => {
        if (from.fullPath === '/add-address') {
          next({
            path: '/mycenter'
          });
        } else {
          next();
        }
      }
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
      },
      children: [
        {
          path: '/settlement/pay',
          name: 'pay',
          component: Pay
        }
      ]
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