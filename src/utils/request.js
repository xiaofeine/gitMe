import axios from 'axios';
import Cookie from 'js-cookie';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function checkDataCode({ data }) {
  if (data.hasOwnProperty('code')) {
    const { code, message } = data;
    if (code === 4001) {
      if (Cookie.get('appType') === 'IOS') {
        window.webkit.messageHandlers.logOut.postMessage({});
      }
      if (Cookie.get('appType') === 'Android') {
        window.WebViewJavascriptBridge.callHandler('appLogout');
      }
      return;
    }
    if (code !== 8001) {
      let error = new Error(message);
      error.code = code;
      throw error;
    }
  }
  return Promise.resolve(data);
}

function errReject(err) {
  if (err.message === 'Network Error') {
    return Promise.reject({ message: '网络异常，请检查网络' });
  }
  if (err.hasOwnProperty('response')) {
    const { response } = err;
    return Promise.reject({ status: response.status, message: response.statusText });
  }
  return Promise.reject({ code: err.code, message: err.message });
}

export default function request({ headers, ...options }) {
  const token = Cookie.get('token') || window.token;
  const AppType = Cookie.get('appType') || window.appType;
  const defaultHeaders = {
    AppType,
    Timestamp: new Date().getTime(),
    Authorization: token,
  };
  const newHeaders = { ...defaultHeaders, ...headers };
  const defaultOptions = {
    method: 'GET',
    headers: newHeaders,
  };
  return axios({ ...defaultOptions, ...options })
    .then(checkStatus)
    .then(checkDataCode)
    .catch(errReject);
}
