import request from '@/utils/request'

//代码优化,抽取共同点
const group_name = 'user'
const api_name = 'admin'

export function login(loginname, password) {
  return request({
    url: `/${group_name}/${api_name}/login`,
    method: 'post',
    data: {
      loginname,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: `/${group_name}/${api_name}/info`,
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: `/${group_name}/${api_name}/logout`,
    method: 'post'
  })
}
