import service from '@/utils/system/request';
import request from '@/utils/system/request'




/** 登录api */
export function loginApi(data: { username: string; password: string }) {
  return service.post('/login/', data)
}

/** 获取用户信息Api */
export function getInfoApi(data: object) {

  return service.get('/user/info', data)
}

/** 退出登录Api */
export function loginOutApi() {
  return request({
    url: '/user/out',
    method: 'post',
    baseURL: '/mock'
  })
}

/** 获取用户信息Api */
export function passwordChange(data: object) {
  return request({
    url: '/user/passwordChange',
    method: 'post',
    baseURL: '/mock',
    data
  })
}

/** 获取登录后需要展示的菜单 */
export function getMenuApi() {
  return request({
    url: '/menu/list',
    method: 'post',
    baseURL: '/mock'
  })
}