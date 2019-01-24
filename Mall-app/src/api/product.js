import { require, getServerUrl } from './require';

export function getProductList(data) {
  return require({
    url: '/product/list.do',
    params: data
  })
}

export function getProductDetail(id) {
  return require({
    url: '/product/detail.do',
    params: {
      productId: id
    }
  })
}