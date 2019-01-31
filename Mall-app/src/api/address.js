import { require } from './require';

export function getAddressList(pageNum = 1, pageSize = 10) {  // 获取地址列表
  return require({
    url: '/shipping/list.do',
    params: {
      pageNum,
      pageSize
    }
  })
}

export function addAddress(info) {  // 添加新地址
  return require({
    url: '/shipping/add.do',
    params: info
  })
}

export function deleteAddress(shippingId) {  // 删除某条地址
  return require({
    url: '/shipping/del.do',
    params: {
      shippingId
    }
  })
}

export function selectAddress(shippingId) {  // 查看具体某条地址
  return require({
    url: '/shipping/select.do',
    params: {
      shippingId
    }
  })
}

export function updateAddress(info) {  // .登录状态更新地址
  return require({
    url: '/shipping/update.do',
    params: info
  })
}

