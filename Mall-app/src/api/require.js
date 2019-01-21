import axios from 'axios';

export function require(param) {
  return new Promise((resolve, reject) => {
    return axios({
      method: param.method || 'get',
      url: param.url,
      params: param.params || ''
    }).then(res => {
      resolve(res.data);
    }).catch(ex => {
      reject(ex);
    })
  })
}

export function getServerUrl(url) {
  return '' + url;
}

export const ERR_OK = 0;