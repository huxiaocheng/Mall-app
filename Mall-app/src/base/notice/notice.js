import Vue from 'vue';
import Component from './notice.vue';
const NoticeConstructor = Vue.extend(Component);

const Notice = content => {

  const NoticeInstance = new NoticeConstructor({
    data: { content }
  })
  NoticeInstance.vm = NoticeInstance.$mount();
  NoticeInstance.vm.visible = true;
  NoticeInstance.dom = NoticeInstance.vm.$el;
  document.body.appendChild(NoticeInstance.dom);
  return NoticeInstance.vm;
}

export default {
  install: Vue => {
    Vue.prototype.$notice = Notice
  }
}