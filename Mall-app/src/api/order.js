import request from './request';

export function createOrder(id) {  // 创建订单
  return request({
    url: '/order/create.do',
    params: {
      shippingId: id
    }
  })
}

export function getOrderCartList() {  // 获取提交订单商品列表
  return request({
    url: '/order/get_order_cart_product.do'
  })
}

export function getOrderList(pageNum, pageSize) {  // 获取订单列表
  return request({
    url: '/order/list.do',
    params: {
      pageNum,
      pageSize
    }
  })
}

export function cancelOrder(orderNo) {  // 取消订单
  return request({
    url: '/order/cancel.do',
    params: {
      orderNo
    }
  })
}