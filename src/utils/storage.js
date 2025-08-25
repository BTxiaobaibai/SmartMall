const INFO_KEY = 'xbb_shopping_info'
const HISTORY_KEY = 'xbb_history_list'

// 获取本地存储内容
export const getInfo = () => {
  const defaultInfo = { token: '', userId: '' }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultInfo
}

// 设置本地存储内容
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}

// 删除本地存储内容
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 商品搜索历史记录持久化
// 获取，没有发那会默认空(三元表达式)
export const getHistory = () => {
  const res = localStorage.getItem(HISTORY_KEY)
  return res ? JSON.parse(res) : []
}

// 设置
export const setHistory = (obj) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(obj))
}
