import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // Internationalization
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import { mockXHR } from '../mock' // simulation data

import global_ from './Global.vue'
import axios from 'axios'

// 设置全局变量
Vue.prototype.GLOBAL = global_
// mock api in github pages site build
if (process.env.LOCAL_SERVER === 'localhost') {
  mockXHR()
  axios.defaults.baseURL = global_.LOCAL_BASE_URL
} else {
  mockXHR()
  axios.defaults.baseURL = global_.PRO_BASE_URL
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value),
  global
})

Vue.prototype.$ajax = axios

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.prototype.goToDetail = function (row) {
  debugger
  var url = ''
  if (row.websiteName === 'aiyaku') {
    url = 'https://www.aiyaku.com' + row.path
  }
  if (row.websiteName === '202832') {
    url = 'https://www.202832.com/product/' + row.path + '.html'
  }
  if (row.websiteName === 'yayibang') {
    url =
      'https://www.yayibang.com/views/web/article/goods_details.html?goods_id=' +
      row.path
  }
  if (row.websiteName === 'yae920') {
    url = 'http://www.yae920.com/' + row.path
  }
  if (row.websiteName === 'mmm920') {
    url = row.path
  }
  if (row.websiteName === 'dental360') {
    url = row.path
  }
  if (row.websiteName === 'kqkqsc') {
    url = 'http://www.kqkqsc.com/' + row.path
  }
  if (url !== '') {
    window.open(url, '_blank')
  }
}
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
