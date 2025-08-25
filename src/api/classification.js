import request from '@/utils/request'

export const getClassificationList = () => {
  return request.get('/category/list')
}
