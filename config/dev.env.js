// 开发环境配置
/*eslint-disable*/
const dotenv = require('dotenv');
const env = dotenv.config({'path': '../.env'}).parsed || {};
const _ = require('lodash');

module.exports = _.assign({
  apiHost: 'http://localhost:3002',
  imgHost: '//img-test.51jk.com',
  payHost: 'http://busm-test.51jk.com',
  siteId: 100073,
  wxhost: '.weixin-test.51jk.com',
  dshost: '.disapp-test.51jk.com',
  download:{
    android:'http://a.app.qq.com/o/simple.jsp?pkgname=zaozhuangbaixing.com',
    ios:'https://fir.im/wdyq'
  }
}, env);
