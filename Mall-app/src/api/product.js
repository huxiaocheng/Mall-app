import request from './request';

export function getProductList(data) {  // 商品列表
  return request({
    url: '/product/list.do',
    params: data
  })
}

export function getProductDetail(id) {  // 商品详情
  return request({
    url: '/product/detail.do',
    params: {
      productId: id
    }
  })
}