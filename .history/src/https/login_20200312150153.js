import request from 'utils/request';
import { api } from 'utils/config';

const {
   loginApi
 } = api;

export const login = (params) => {
   console.log(params,'params111')
   return instance.post('/app/v1/login', { params: params });
};

// post
export const getConsultant = (params) => {
   return instance.post(API.GET_CONSULTANT_API, params);
};