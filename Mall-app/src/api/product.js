import { require } from './require';

export function getProductList(data) {  // 商品列表
  return require({
    url: '/product/list.do',
    params: data
  })
}

export function getProductDetail(id) {  // 商品详情
  return require({
    url: '/product/detail.do',
    params: {
      productId: id
    }
  })
}