import Vue from 'vue';
import App from '@/App.vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'nprogress/nprogress.css';

import '@/styles/index.less';

import router from './router';

// Axios 请求拦截器：axios 发出去的请求会先经过这里
import axios from 'axios';
import { getUser, removeUser } from '@/utils/auth';

axios.interceptors.request.use(function (config) {
  console.log('请求进入了拦截器');
  // return config 是允许请求发送的开关
  // 我们可以在这之前进行一些业务逻辑操作
  // console.log(config)
  const user = getUser();
  // console.log(user)
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Axios 响应拦截器 ：Axios收到的响应会先经过这里

axios.interceptors.response.use(function (response) {
  // response 就是响应结果对象
  // 这里将response原样返回，那么你发请求的地方收到的就是response
  // console.log('进入响应拦截器');
  // console.log(response)
  if (typeof response.data === 'object' && response.data.data) {
    // console.log(response.data.data)
    return response.data.data;
  } else {
    return response;
  }
}, function (error) {
  console.log(error);
  if (error.request.status === 401) {
    removeUser();
    router.push({
      name: 'login'
    });
  } else {
    return Promise.reject(error);
  }
});

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
