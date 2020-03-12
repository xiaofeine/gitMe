const prefix = '/app/v1';
const domain = 'http://guohe.test.senthink.com';

import axios from 'axios';
import { message } from 'antd';
import {createHashHistory} from 'history';

const instance = axios.create({
  //当创建实例的时候配置默认配置
  xsrfCookieName: 'xsrf-token'
});

//添加请求拦截器
instance.interceptors.request.use(function(config){
  //在发送请求之前做某事，比如加一个loading
  if(commonInfo.hasLoading){
    message.info('12', 3);
  }
  return config;
},function(error){
  //请求错误时做些事
  message.error(error,5);
  return Promise.reject(error);
});

//添加一个响应拦截器
instance.interceptors.response.use(function (response) {
  // 1.成功
  if (response.data.success && response.data.messageCode === globalCode.success) {
      if(commonInfo.hasLoading){
        message.info(12);
      }
      return response.data.data;
  }

  // 2.session过期
  if (!response.data.success && response.data.messageCode === globalCode.timeout) {
      message.info(12);
      message.info("会话过期，请重新登录", 1);
      createHashHistory().push('/login');

      // 定义一个messagecode在后面会用到
      return  Promise.reject({
          messageCode: 'timeout'
      })
  }

  // 3.11111111 系统异常、网络异常
  if (response.data.success && response.data.messageCode === globalCode.busyCode) {
      message.info(response.data.message, 1);
      return  Promise.reject({
          messageCode: 'netError'
      })
  }

  // 3.其他失败，比如校验不通过等
  return Promise.reject(response.data);
}, function () {
  // 4.系统错误，比如500、404等
  message.info('系统异常，请稍后重试！', 1);
  return Promise.reject({
      messageCode: 'sysError'
  });
});

export default instance;