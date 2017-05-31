/* eslint-disable */
import React, { Component, PropTypes } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import route from '../Config/Route';
import store from '../Config/Store';
import 'normalize.css'; //重置浏览器默认样式
import '../Style/style.less'; //加载公共样式
import '../Iconfont/iconfont.css'; //字体图标

// 移动端300ms延时的点击事件
import initReactFastclick from 'react-fastclick';
initReactFastclick();

render(
    <Provider store={store}>
        {route}
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);
