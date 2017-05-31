var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var os = require('os');
const env = require('dotenv').config().parsed || {};

// const opn = require('opn');
const port = env.port || 3000;
const proxyHost = env.proxy || 'http://busm-test.51jk.com';
var proxy = {
  '/distributor/*': {
    target: proxyHost,
    changeOrigin: true,
  },
};

if (os.platform() === 'win32') {
  config.entry.app.unshift(`webpack-dev-server/client?http://localhost:${port}/`, 'webpack/hot/dev-server');
} else {
  config.entry.app.unshift(`webpack-dev-server/client?http://172.20.10.188:${port}/`, 'webpack/hot/dev-server');
}
config.plugins.push(new webpack.HotModuleReplacementPlugin());

// 启动服务
var server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  proxy: proxy,
  stats: {
    colors: true,
  },
  hot: true,
  inline: true,
});

// 将其他路由，全部返回index.html
server.app.get('*', function (req, res, next) {
      let newReq = Object.assign({}, req, {url: '/'});
      return server.middleware(newReq, res, next);
});

server.listen(port);
