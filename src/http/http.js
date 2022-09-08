/**
 * 请求库的配置
 * @file 底层请求库封装
 * @author author-name(李红波 15537053107)
 */

import axios from 'axios'
import { interceptors } from '@/http/interceptors'

/**
 * ① 把 axios 的请求根路径设置为 vue 项目的运行地址（接口请求不再跨域）
 * ② vue 项目发现请求的接口不存在，把请求转交给 proxy 代理
 * ③ 代理把请求根路径替换为 devServer.proxy 属性的值，发起真正的数据请求
 * ④ 代理把请求到的数据，转发给 axios
 */
// 开发环境配置
var baseURL = ''
if (location.hostname === 'localhost') {
  console.log(process.env, 'process.env')
  baseURL = ""
} else if (location.hostname.includes('dev')) {
  baseURL = ""
} else {
  baseURL = ""
}

// 初始化
const service = axios.create({
  baseURL, // 内置对象
  timeout: 10000
})

interceptors(service)

export default service