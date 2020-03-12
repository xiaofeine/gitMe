const prefix = '/app/v1';
const domain = 'http://guohe.test.senthink.com';

module.exports = {
  prefix,
  passwordReg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,26}$/,
  domain,
  api: {
    loginApi: `${prefix}/login`,
  },
};

console.log(domain,'ddd',module.exports)