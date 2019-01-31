import axios from 'axios';

export const require = axios.create({
  baseURL: '',
  timeout: 60000
});

require.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  }
  return config;
}, err => {
  return Promise.reject(err);
})

require.interceptors.response.use(response => {
  if (response.data.status === 0) {
    return Promise.resolve(response.data);
  } else if (response.data.status === 1) {
    return Promise.reject(response.data);
  } else if (response.data.status === 10) {
    return Promise.reject(response.data);
  }
}, err => {
  return Promise.reject(err);
})