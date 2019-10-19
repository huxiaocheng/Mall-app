import request from './request';

export function getPayQRcode(orderNo) {  // 获取购物车列表
  return request({
    url: '/order/pay.do',
    params: {
      orderNo
    }
  })
}