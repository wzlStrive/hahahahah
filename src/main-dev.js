// 入口文件
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
import axios from 'axios'
import Router from 'vue-router'
import TreeTable from 'vue-table-with-tree-grid'
import 'default-passive-events'
import moment from 'moment'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 导入 NProgress 包对应的js css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.prototype.$moment = moment
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 在request 拦截器中展示进度条 调用NProgress.start();
// axios请求拦截器
axios.interceptors.request.use(config => {
  NProgress.start()
  // 为请求头对象添加 token验证Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 在在request 拦截器中隐藏进度条 调用 NProgress.done();
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.use(Router)
Vue.prototype.$http = axios
Vue.config.productionTip = false
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.component('tree-table', TreeTable)
// 将富文本编辑器 注册成全局可用的组件
Vue.use(VueQuillEditor)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
