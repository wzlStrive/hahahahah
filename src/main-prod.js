// 入口文件
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入全局样式表
import './assets/css/global.css'
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'
import 'default-passive-events'
import moment from 'moment'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// 导入 NProgress 包对应的js css
import NProgress from 'nprogress'

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
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)
// 将富文本编辑器 注册成全局可用的组件
Vue.use(VueQuillEditor)
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
