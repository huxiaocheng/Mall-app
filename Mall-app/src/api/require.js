import Vue from 'vue';
import axios from 'axios';


export function require(param) {
  return new Promise((resolve, reject) => {
    return axios({
      method: param.method || 'get',
      url: getServerUrl(param.url),
      params: param.params || '',
      data: param.data || ''
    }).then(res => {
      if(res.data.status === 0) { // 成功
        resolve(res.data);
      } else if(res.data.status === 1) { // 失败
        new Vue().$notice(res.data.msg);
        if (res.data.msg === '用户未登录,无法获取当前用户的信息') {
          resolve('not-login')
        }
      } else if(res.data.status === 10) { // 强制登录
        resolve('not-login')
      }
    }).catch(ex => {
      console.log(ex);
      // reject(ex.response.statusText);
    })
  })
}

function getServerUrl(url) {
  return '' + url;
}