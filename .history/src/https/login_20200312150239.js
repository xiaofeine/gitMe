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

// post
export const getConsultant = (params) => {
   return instance.post(API.GET_CONSULTANT_API, params);
};