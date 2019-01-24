import { require } from './require';
import qs from 'qs';
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export function userLogin(userInfo) {
  userInfo = qs.stringify(userInfo);
  return require({
    url: '/user/login.do',
    method: 'post',
    data: userInfo
  })
}

export function userRegister(userInfo) {
  userInfo = qs.stringify(userInfo);
  return require({
    url: '/user/register.do',
    method: 'post',
    data: userInfo
  })
}

export function checkRegisterUsername(username) {
  username = qs.stringify(username);
  return require({
    url: '/user/check_valid.do',
    method: 'post',
    data: username
  })
}

export function getUserInfo() {
  return require({
    url: '/user/get_user_info.do',
    method: 'post'
  })
}

export function getQuestion(username) {
  return require({
    url: '/user/forget_get_question.do',
    method: 'post',
    data: {
      username
    }
  })
}