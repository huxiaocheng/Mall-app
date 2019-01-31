import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
// import FastClick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';
import Notice from 'base/notice/notice.js';

import 'common/scss/base.scss';
import 'common/iconfont/iconfont.css';

// FastClick.attach(document.body);
// FastClick.prototype.focus = function (targetElement) {
//   if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
//     const length = targetElement.value.length;
//     targetElement.focus();
//     targetElement.setSelectionRange(length, length);
//   } else {
//     targetElement.focus();
//   }
// };

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
