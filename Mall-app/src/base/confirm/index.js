import Vue from 'vue';
import Confirm from './confirm.vue';

let newInstance;
const ConfirmInstance = Vue.extend(Confirm);

const initInstance = () => {
  newInstance = new ConfirmInstance();
  console.log(newInstance.$mount().$el)
  document.body.appendChild(newInstance.$mount().$el);
}

export default options => {
  if (!newInstance) {
    initInstance();
  }
  Object.assign(newInstance, options);

  return newInstance.show(vm => {
    newInstance = null;
  })
}