import request from '@/http/http'

// 工作职类
export function getPositionCategoryList (params) {
  return request('/api/muyuan-hr-recruit/recruit/anon/deliveryWeb/getPositionCategoryList', {
    params
  })
}
// 工作职类
export function getRecruitNewsNoticeList (params) {
  return request('/api/muyuan-hr-recruit/recruit/anon/deliveryWeb/getRecruitNewsNoticeList', {
    params
  })
}
// 工作列表
export function getPageInfoByCondition (params) {
  return request('/api/muyuan-hr-recruit/recruit/anon/deliveryWeb/getPageInfoByCondition', {
    params
  })
}
// 投递
export function postDelivery (params) {
  return request('/api/muyuan-hr-recruit/recruit/authc/deliveryWeb/postDelivery', {
    params
  })
}
// 收藏
export function addResumeDatabaseSelfPositionCollection (params) {
  return request('/api/muyuan-hr-recruit/recruit/authc/positionCollection/addResumeDatabaseSelfPositionCollection', {
    method: 'post',
    data: params
  })
}
// 我的投递列表
export function getPositionDeliveryList (params) {
  return request('/api/muyuan-hr-recruit/recruit/authc/deliveryWeb/getPositionDeliveryList', {
    params
  })
}
// 获取岗位收藏表对象列表
export function getPositionCollectionList (params) {
  return request('/api/muyuan-hr-recruit/recruit/authc/positionCollection/getPositionCollectionList', {
    params
  })
}
// 取消收藏
export function delResumeDatabaseSelfPositionCollection (positionCollectionId) {
  return request(`/api/muyuan-hr-recruit/recruit/authc/positionCollection/delResumeDatabaseSelfPositionCollection/${positionCollectionId}`, {
    method: 'delete'
  })
}
// 修改昵称
export function updateNickName (params) {
  return request(`/api/muyuan-hr-recruit/recruit/baseuser/updateNickName`, {
    method: 'post',
    data: params
  })
}

