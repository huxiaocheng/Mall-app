// import axios from 'axios';
import { require } from './require';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export function userLogin(userInfo) {  // 登录
  return require({
    url: '/user/login.do',
    method: 'post',
    data: userInfo
  })
}

export function userRegister(userInfo) {  // 注册
  return require({
    url: '/user/register.do',
    method: 'post',
    data: userInfo
  })
}

export function checkRegisterUsername(username) {  // 注册时检查用户名是否有效
  return require({
    url: '/user/check_valid.do',
    method: 'post',
    data: username
  })
}

export function getUserInfo() {  // 获取登录用户信息
  return require({
    url: '/user/get_user_info.do',
    method: 'post'
  })
}

export function getQuestion(username) {  // 忘记密码第一步 根据用户名得到问题
  return require({
    url: '/user/forget_get_question.do',
    method: 'post',
    data: username
  })
}

export function checkAnswer(pwdInfo) {  // 忘记密码第二步 获取token
  return require({
    url: '/user/forget_check_answer.do',
    method: 'post',
    data: pwdInfo
  })
}

export function setNewPwd(pwdInfo) {  // 忘记密码第三步 提交新密码
  return require({
    url: '/user/forget_reset_password.do',
    method: 'post',
    data: pwdInfo
  })
}

export function logout() {  // 退出登录
  return require({
    url: '/user/logout.do',
    method: 'post'
  })
}

export function updateInfo(info) {  // 登录状态更新用户信息
  return require({
    url: '/user/update_information.do',
    method: 'post',
    data: info
  })
}

export function updatePwd(pwdInfo) {  // 登录状态更新密码
  return require({
    url: '/user/reset_password.do',
    method: 'post',
    data: pwdInfo
  })
}