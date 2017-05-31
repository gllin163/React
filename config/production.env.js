// 线上环境配置
/*eslint-disable*/
const devEnv = require('./dev.env.js');

const _ = require('lodash');

module.exports = _.assign(devEnv, {
  apiHost: 'http://100073.disapp-run.51jk.com',
  imgHost: '//img01.pic.12306pc.cn',
  siteId: 100073,
  wxhost: '.weixin-run.51jk.com',
  download:{
    android:'https://fir.im/cx3e',
    ios:'https://fir.im/wdyq'
  }
});
