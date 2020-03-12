import instance from '../utils/axiosCore';

// PS:此处如果对请求参数格式有疑问的可以查看官网资料，此处就不一一做详细解释了
// get
export const login = (params) => {
   console.log(params,'params111')
   return instance.get('/user', { params: params });
};

// post
export const getConsultant = (params) => {
   return instance.post(API.GET_CONSULTANT_API, params);
};