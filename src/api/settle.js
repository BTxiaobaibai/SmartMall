import request from '@/utils/request'

// 结算
export const settleAccount = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      // shopId: 10,
      delivery: 0,
      couponId: 0,
      isUsePoints: 0,
      ...obj
    }
  })
}

// 提交订单
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 0,
    couponId: 0,
    isUsePoints: 0,
    payType: 10,
    ...obj
  })
}
