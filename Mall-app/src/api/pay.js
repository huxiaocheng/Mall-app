import { require } from './require';

export function getPayQRcode(orderNo) {  // 获取购物车列表
  return require({
    url: '/order/pay.do',
    params: {
      orderNo
    }
  })
}