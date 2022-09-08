/**
 * 请求相关的配置函数
 * @file 请求库工具函数封装
 * @author author-name(李红波 15537053107)
 */

import {
  ElMessage ,
  ElNotification 
} from 'element-plus'
import router from '@/router/index'

/**
 * message 提示函数
 *
 * @param {*} msg 提示的信息，5秒后关闭
 */
export const message = msg => {
  ElMessage({
    message: msg,
    type: 'error',
    duration: 5 * 1000
  })
}

/**
 * ElNotification  提示函数 
 *
 * @param {*} msg 提示信息
 * @param {*} a  提示信息的下标
 */
export const notification = (msg, a) => {
  ElNotification ({
    title: '请求异常',
    type: 'error',
    message: msg,
    offset: 70 * a
  })
}

/**
 * 登录页跳转函数
 *
 */
export const toLogin = () => {
  router.replace({
    path: '/login'
  })
  sessionStorage.clear()
  // location.reload()
}
// 极速入职登录
export const toSpeedLogin = () => {
  router.replace({
    path: '/speedLogin'
  })
  sessionStorage.clear()
  // location.reload()
}

/**
 * 请求失败后的错误统一处理
 *
 * @param {*} status 响应的状态码
 * @param {*} msg    响应的信息
 */
export const errorHandle = (status, msg) => {

    switch (status) {
      // 401: 未登录 || 未经授权
      // 跳转登录页
      case 401:
        ElMessage.error('未登录，请先登录！');
        toLogin();
        break;
      // 403: token 过期 || 权限不足
      // 展示提示信息
      case 403:
        ElMessage.error('温馨提示:用户访问权限不足!');
        break;
      // 其他错误，直接展示后台错误提示
      default:
        // console.log('返回的msg',msg)
        ElMessage.error(msg);
    }
}