import Vue from 'vue'
import Component from './notice'
const NoticeConstructor = Vue.extend(Component)

const Notice = (content) => {

  const NoticeInstance = new NoticeConstructor({
    data: {
      content: content
    }
  })
  NoticeInstance.vm = NoticeInstance.$mount()
  NoticeInstance.vm.visible = true
  NoticeInstance.dom = NoticeInstance.vm.$el
  document.body.appendChild(NoticeInstance.dom)
  return NoticeInstance.vm
}

export default {
  install: Vue => {
    Vue.prototype.$notice = Notice
  }
}