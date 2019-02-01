export function isCorrectPhone(num) { //手机号
  return !/^1\d{10}$/.test(num);
}

export function isCorrectEmail(email) {  // 邮箱
  return !/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(email);
}