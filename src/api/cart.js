import request from '@/utils/request'

// 添加到购物车
export const getAddCart = ({ goodsId, goodsNum, goodsSkuId }) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 获取购物车列表
export const getCartList = () => {
  return request.get('/cart/list')
}

// 商品数量修改
export const changeGoodsCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 删除购物车商品
export const delCart = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
