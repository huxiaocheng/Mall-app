import { require, getServerUrl } from './require';

export function getProductList(data) {
  return require({
    url: '/product/list.do',
    params: data
  })
}