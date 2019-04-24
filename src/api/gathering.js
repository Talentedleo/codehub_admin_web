import request from '@/utils/request'

//easy-mock查询活动接口
/**export function getList() {
  return request({
    url: '/gathering/gathering',
    method: 'get'
  })
}

//分页查询活动,带参数的
export function search(page, size, searchData){
  return request({
    url: '/gathering/gathering/search/{page}/{size}',
    method: 'post',
    data: searchData
  })
}*/

//代码优化,抽取共同点
const group_name = 'gathering'
const api_name = 'gathering'

//批量导出方法
export default {
  getList() {
    return request({
      url: `/${group_name}/${api_name}`,
      method: 'get'
    })
  },
  search(page, size, searchData){
    return request({
      url: `/${group_name}/${api_name}/search/${page}/${size}`,
      method: 'post',
      data: searchData
    })
  },
  save(pojo){
    return request({
      url: `/${group_name}/${api_name}`,
      method: 'post',
      data: pojo
    })
  },
  update(id, pojo){
    // === 恒等于
    if (id === 0){
      return this.save(pojo);;
    }
    return request({
      url: `/${group_name}/${api_name}/${id}`,
      method: 'put',
      data: pojo
    })
  },
  findById(id){
    return request({
      // 模板字符串,动态放id进去
      url: `/${group_name}/${api_name}/${id}`,
      method: 'get'
    })    
  },
  delete(id){
    return request({
      // 模板字符串,动态放id进去
      url: `/${group_name}/${api_name}/${id}`,
      method: 'delete'
    })    
  } 
}