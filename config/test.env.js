// 测试环境
/*eslint-disable*/
const devEnv = require('./dev.env.js');

const _ = require('lodash');

module.exports = _.assign(devEnv, {
  apiHost: 'http://100073.disapp.test.51jk.com',
  siteId: 100073
});
