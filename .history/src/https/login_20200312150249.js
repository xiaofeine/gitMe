import request from 'utils/request';
import { api } from 'utils/config';

const {
   loginApi
 } = api;

 export async function loginApi(params) {
   return request({
     url: loginApi,
     params,
   });
 }
