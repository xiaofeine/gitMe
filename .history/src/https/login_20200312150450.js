import request from 'utils/request';
import { api } from 'utils/config';

const {
   loginApi
 } = api;

 export async function login(params) {
   return request({
     url: loginApi,
     params,
   });
 }
