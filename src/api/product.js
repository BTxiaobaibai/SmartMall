import request from '@/utils/request'

// 获取商品列表
export const getProducts = (obj) => {
  return request.get('/goods/list', {
    params: obj
  })
}

// 获取商品详情
export const getGoodsDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

// 获取评论详情
export const getCommentsData = ({ goodsId, limit }) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
