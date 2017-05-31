import React, { Component } from 'react';
// import {browserHistory as history, Router,} from 'react-router';
import {Router, Route, IndexRoute, browserHistory as history, hashHistory, Redirect, withRouter,} from 'react-router';
export {

 };
class Roots extends Component {
  render () {
    return (
      <div>{this.props.children}</div>
    );
  }
}

function userAuth (nextState, replace, cb) {
    // 从localStorage中获取loginUser 不为空视为已登录 在退出登陆或获取发起ajax请求时如果服务端返回code是302清除数据
    const loginUser = localStorage.getItem('phone_num');
    if (!loginUser) {
        replace({
            pathname: '/login/login',
            state: {
                form: '/' + this.path,
                stash: nextState.location.state,
            },
        });
   }
  cb();
}

function routeRequireHelper (path) {
  return require(`./${path}.js`).default;
};

const rootRoute = {
  path: '/',
  indexRoute: {
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('../Component/indexList/IndexList').default);
      }, 'IndexList');
    },
    /*onEnter: userAuth,*/
  },
  component: Roots,
 /* childRoutes: [{
    //1.我的奖励
    path: 'reward/rewardList',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('../Component/indexList/IndexList').default);
      }, 'reward_rewardList');
    },

  }],*/
};

const RouteConfig = (
  <Router history={history} routes={rootRoute}/>
);
export default RouteConfig;
