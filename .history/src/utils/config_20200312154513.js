const prefix = '/action';
const domain = 'http://test.lierdalux.cn:8091/action';

module.exports = {
  prefix,
  passwordReg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,26}$/,
  domain,
  api: {
    loginApi: `${prefix}/login`,
  },
};
