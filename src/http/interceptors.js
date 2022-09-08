/**
 * 请求库的拦截器配置
 * @file 请求库拦截器封装
 * @author author-name(李红波 15537053107)
 */

import * as fn from './function'
// import VueRouter from 'vue-router'
import Router from '@/router/index'
// import { getToken } from '@/common/base/auth'

export function interceptors (service) {
  // 请求的配置
  service.interceptors.request.use(
    config => {
      var getToken = window.sessionStorage.getItem('token') || window.localStorage.getItem('token')
      var getauthorization = window.sessionStorage.getItem('authorization') || window.localStorage.getItem('authorization')
      if ((config.method == 'post' || config.method == 'put' || config.method == 'delete') && config.data) {
        // let newData = {
        //   // tenantId: '000000',
        //   // token: getToken() || ''
        // }
        // for (let key in config.data) {
        //   newData[key] = config.data[key]
        // }
        // config.data = newData
        let baseToken = config.headers['Muyuan-Auth'] ? config.headers['Muyuan-Auth'] : ''
        let ContentType = config.headers['Content-Type'] ? config.headers['Content-Type'] : ''
        config.headers = {
          token: getToken || '',
          Authorization: getauthorization || '',
          'Muyuan-Auth': baseToken,
          'Content-Type': ContentType || 'application/json',
          // 'Content-Type': false,
          // processData: false
        }
      } else {
        let newParams = {
          // tenantId: '000000',
          // token: getToken() || ''
        }
        for (let key in config.params) {
          newParams[key] = config.params[key]
        }
        config.params = newParams;
        config.headers = {
          token: getToken || '',
          Authorization: getauthorization || '',
        }
      }
      return config
    },
    error => {
      Promise.reject(error)
    }
  )

  // 响应的配置
  service.interceptors.response.use(
    res => {
      // console.log(res.data.msg);
      if (res.data.code != 200) {
        if (res.data.code === 401) { // 登录失效
          if(window.localStorage.getItem('isMobile')) {
            Router.push('/speedLogin')
          } else {
            Router.push('/login')
          }
          // localStorage.clear()
          sessionStorage.clear()
        }
        fn.errorHandle(res.data.code, res.data.msg);
        return res.data
      } else {
        return res.data
      }

    },
    error => {
      // console.log(error.response);
      if (error.response) {
        fn.errorHandle(error.response.status, error.response.data.msg);
        return Promise.reject(error.response)
      }
    }
  )
}