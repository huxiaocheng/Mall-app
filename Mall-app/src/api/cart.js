import { require } from './require';

export function getCartList() {  // 获取购物车列表
  return require({
    url: '/cart/list.do'
  })
}

export function addProductToCart(productId, count) {  // 添加商品到购物车
  return require({
    url: '/cart/add.do',
    params: {
      productId,
      count
    }
  })
}

export function updateProductCount(productId, count) {  // 更新某个商品的数量
  return require({
    url: '/cart/update.do',
    params: {
      productId,
      count
    }
  })
}

export function removeProduct(productIds) {  // 移除购物车某个产品
  return require({
    url: '/cart/delete_product.do',
    params: {
      productIds
    }
  })
}

export function selectProduct(productId) {  // 选中某个商品
  return require({
    url: '/cart/select.do',
    params: {
      productId
    }
  })
}

export function unSelectProduct(productId) {  // 取消选中某个商品
  return require({
    url: '/cart/un_select.do',
    params: {
      productId
    }
  })
}

export function getCartNum() {  // 查询在购物车里的产品数量
  return require({
    url: '/cart/get_cart_product_count.do'
  })
}

export function selectAll() {  // 购物车全选
  return require({
    url: '/cart/select_all.do'
  })
}

export function unSelectAll() {  // 购物车取消全选
  return require({
    url: '/cart/un_select_all.do'
  })
}
