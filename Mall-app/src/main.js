import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import fastclick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';

import 'common/scss/base.scss';
import 'common/iconfont/iconfont.css';

fastclick.attach(document.body);
Vue.use(VueLazyLoad, {
  loading: require('common/img/load.jpg')
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
