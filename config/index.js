// 根据NODE_ENV环境变量引入配置
/*eslint-disable*/
const env = process.env.NODE_ENV;

var config = require('./' + env + '.env.js');

module.exports = config;
