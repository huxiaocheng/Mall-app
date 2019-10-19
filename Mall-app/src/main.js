import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import VueLazyLoad from 'vue-lazyload';
import Notice from 'base/notice/notice.js';
import Confirm from 'base/confirm';

import 'common/scss/base.scss';
import 'common/iconfont/iconfont.css';

Vue.prototype.$Confirm = Confirm;

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (sessionStorage.getItem('token')) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next();
  }
})

Vue.use(VueLazyLoad, {
  loading: require('common/img/load.jpg')
})
Vue.use(Notice)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
