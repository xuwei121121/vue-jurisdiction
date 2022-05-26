import Axios from 'axios'
import router from '@/router';
import { Message } from 'element-ui';
const axios = Axios.create({
  /* baseURL: 'https://www.fastmock.site/mock/40f13395777d7d0a353baa9fe442c5ec/api',
  timeout: 6 * 1000 */
});
//restful语法
const map = {
  get: 'view',
  post: 'add',
  put: 'edit',
  delete: 'delete'
}
//请求拦截
axios.interceptors.request.use((config) => {
  console.log(config);
  const currentUrl = config.url
  if (currentUrl !== '/login') {
    config.headers.Auchorization = window.sessionStorage.getItem('token')
  }
  const method = config.method
  const action = map[method]
  const currentRights = router.currentRoute.meta.right;
  if (config.url != '/login') {
    if (action && currentRights.indexOf(action) === -1) {
      alert('您没有权限此操作')
      return Promise.reject(new Error('没有权限'))
    }
  }
  return config
})



// axios.interceptors.request.use(function (config) {
//   config.headers.Authorization = window.sessionStorage.getItem('token')//跳转时鉴定
//   const method = config.method//获取拦截器中方法
//   const action = map[method]//拿到restful对应的
//   const currentRoutes = router.currentRoute.meta.right
//   if (config.url != '/login') {
//     if (action && currentRoutes.indexOf(action) === -1) {
//       Message.error('您没有权限进行此操作！！！')
//       return Promise.reject('您没有权限！')
//     }
//   }
//   // 	return config
//   // }, function(error) {
//   // 	console.log(error);
//   // 	return Promise.reject(error);
// })
//响应拦截
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  console.log(error);
  return Promise.reject(error);
})
export default (url, method = 'get', data = {}) => {
  return axios({
    url,
    method,
    data
  })
}
