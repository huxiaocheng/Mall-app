import axios from 'axios';
import qs from 'qs';

export const require = axios.create({
  baseURL: '',
  timeout: 60000
});

require.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    config.data = qs.stringify(config.data);
  }
  return config;
}, err => {
  return Promise.reject(err);
})

require.interceptors.response.use(response => {
  if (response.data.status === 0) {
    return Promise.resolve(response.data);
  } else if (response.data.status === 1) {
    if (response.data.msg === '用户未登录,无法获取当前用户的信息') {
      sessionStorage.removeItem('token');
    }
    return Promise.reject(response.data);
  } else if (response.data.status === 10) {
    sessionStorage.removeItem('token');
    return Promise.reject(response.data);
  }
}, err => {
  return Promise.reject(err);
})