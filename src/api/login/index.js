import request from '@/http/http'

export function registered (params) {
  return request('/api/muyuan-hr-recruit/recruit/myRecruitUser/registered', {
    method: 'post',
    params
  })
}

export function loginOut (params) {
  return request('/api/muyuan-hr-recruit/recruit/myRecruitUser/landingState', {
    params
  })
}
// 新接口

// 获取验证码
export function getLandCode (params) {
  return request('/api/muyuan-hr-recruit/recruit/baseuser/getVerificationByType', {
    params
  })
}

// 手机号登录
export function getQrCode (phone, verificationCode) {
  return request('/api/muyuan-hr-recruit/recruit/baseuser/loginByPhone', {
    params: {
      phone: phone,
      verificationCode: verificationCode
    }
  })
}
// 账号登录
export function accountLogin (params) {
  return request('/api/muyuan-hr-recruit/recruit/baseuser/login', {
    params
  })
}
// 校验是否显示滑块
export function checkFailNumber (params) {
  return request('/api/muyuan-hr-recruit/recruit/baseuser/checkFailNumber', {
    params
  })
}

// 绑定账号
export function siteAccount (params) {
  return request('/api/muyuan-hr-recruit/recruit/baseuser/update', {
    method: 'post',
    data: params
  })
}
// 选择身份
export function updateIdentity (params) {
  return request('/api/muyuan-hr-recruit/recruit/baseuser/updateIdentity', {
    method: 'post',
    data: params
  })
}
// 忘记密码进行重置
export function resetPassword (params) {
  return request('/api/muyuan-hr-recruit/recruit/baseuser/resetPassword', {
    method: 'post',
    data: params
  })
}
// 切换模板
export function switchResumeTemplate (params) {
  return request('/api/muyuan-hr-recruit/recruit/authc/deliveryWeb/switchResumeTemplate', {
    method: 'post',
    data: params
  })
}
// 登录-简历完善
export function loginForResume (params) {
  return request('/api/muyuan-hr-recruit/recruit/baseuser/loginForResume', {
    params
  })
}

