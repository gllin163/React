/*import merged from 'obj-merged';*/
import * as config from '../Config/Config';
const {target} = config;
const Tool = {};
const StoreData = {};
import {Toast} from 'antd-mobile';
let loadingContent = `
<div data-reactroot="" class="am-toast" style="top: 0;">
  <span>
    <div class="am-toast-notice">
      <div class="am-toast-notice-content">
        <div class="am-toast-text am-toast-text-icon">
          <i type="loading" class="anticon anticon-loading"></i>
          <div>加载中...</div>
        </div>
      </div>
    </div>
  </span>
</div>
`;
let isLoading = false;
let loadingId = void 0;
/**
 * 发送ajax请求和服务器交互
 * @param {object} mySetting 配置ajax的配置
 */
Tool.ajax = function (mySetting) {
  if (!isLoading) {
        let div = document.createElement('div');
        loadingId = 'loading-' + (+new Date());
        div.id = loadingId;
        div.innerHTML = loadingContent;
        // 多次请求只有一个loading
        document.body.appendChild(div);
        isLoading = true;
  }

  let setting = {
    url: window.location.pathname,
    async: true,
    type: 'GET',
    data: {},
    dataType: 'json',
    success: function (text) {
    },
    error: function () {
    },
    contentType: 'application/x-www-form-urlencoded',
    timeout: 15000,
  };

  let aData = [];
  let sData = '';
  // 属性覆盖
  setting = {...setting, ...mySetting};
//let wechatToken = localStorage.getItem('wechatToken');
//if (wechatToken) {
//  if (setting.type.toUpperCase() === 'GET') {
//    setting.data.wechatToken = wechatToken;
//  } else {
//    setting.url += '?wechatToken=' + wechatToken;
//  }
//}

  for (var attr in setting.data) {
    aData.push(attr + '=' + filter(setting.data[attr]));
  }
  sData = aData.join('&');
  setting.type = setting.type.toUpperCase();

  var xhr = new XMLHttpRequest();
  try {
    if (setting.async) {
      xhr.timeout = setting.timeout;
    }
    xhr.ontimeout = (e) => {
      Toast.fail('连接超时');
    };
    // xhr.withCredentials = true;
    if (setting.type === 'GET') {
      // get方式请求
      sData = setting.url + '?' + sData;
      xhr.open(setting.type, sData + '&' + new Date().getTime(), setting.async);
      xhr.send();
    } else {
      // post方式请求
      xhr.open(setting.type, setting.url, setting.async);
      xhr.setRequestHeader('Content-Type', setting.contentType);
      if (setting.contentType === 'application/x-www-form-urlencoded') {
        xhr.send(sData);
      } else {
        xhr.send(JSON.stringify(setting.data));
      }
    }
  } catch (e) {
    return httpEnd();
  }

  if (setting.async) {
    xhr.addEventListener('readystatechange', httpEnd, false);
  } else {
    httpEnd();
  }

  function httpEnd() {
    if (xhr.readyState == 4) {
      if (isLoading) {
        document.querySelector('#' + loadingId).remove();
        isLoading = false;
      }
      var head = xhr.getAllResponseHeaders();
      var response = xhr.responseText;
      //将服务器返回的数据，转换成json

      try {
        if (setting.dataType === 'json') {
          response = JSON.parse(response);
          if (+response.code === 403) {
            // 这里不跳重新登陆 在路由处理
            localStorage.removeItem('phone_num');
          }
        }
      } catch (e) {
        response = null;
      }

      if (xhr.status == 200) {
        setting.success(response, setting, xhr);
      } else {
        setting.error(setting, xhr);
      }
    }
    /* else {
     Toast.offline('网络连接失败!!!', 2);
     }*/
  }

  xhr.end = function () {
    xhr.removeEventListener('readystatechange', httpEnd, false);
  }

  function filter(str) { //特殊字符转义
    if (str === null || str === undefined) {
      str = '';
    }
    str += ''; //隐式转换
    str = str.replace(/%/g, '%25');
    str = str.replace(/\+/g, '%2B');
    str = str.replace(/ /g, '%20');
    str = str.replace(/\//g, '%2F');
    str = str.replace(/\?/g, '%3F');
    str = str.replace(/&/g, '%26');
    str = str.replace(/\=/g, '%3D');
    str = str.replace(/#/g, '%23');
    return str;
  }

  return xhr;
};
/**
 * 封装ajax post请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */
Tool.post = function (pathname, data, success, error) {
  var setting = {
    url: target + pathname,
    type: 'POST',
    data: data,
    success: success || function () {
    },
    error: error || function () {
    }
  };
  return Tool.ajax(setting);
};

/**
 * 同步ajax post
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法 *
 * */
Tool.syncPost = function (pathname, data, success, error) {
  var setting = {
    url: target + pathname,
    async: false,
    type: 'POST',
    data: data,
    success: success || function () {
    },
    error: error || function () {
    },
  };
  return Tool.ajax(setting);
};

/**
 * 封装ajax get请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */
Tool.get = function (pathname, data, success, error) {
  var setting = {
    url: target + pathname,
    type: 'GET',
    data: data,
    success: success || function () {
    },
    error: error || function () {
    }
  };
  return Tool.ajax(setting);
};

/**
 * 格式化时间
 *
 * @param {any} t
 * @returns
 */
Tool.formatDate = function (str) {
  var date = new Date(str);
  var time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return '';
  } else if (time / 1000 < 60) {
    return '刚刚';
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + '分钟前';
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + '小时前';
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + '天前';
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + '月前';
  } else {
    return parseInt(time / 31536000000) + '年前';
  }
}

/**
 * 本地数据存储或读取
 *
 * @param {any} key
 * @param {any} value
 * @returns
 */
Tool.localItem = function (key, value) {
  if (arguments.length == 1) {
    return localStorage.getItem(key);
  } else {
    return localStorage.setItem(key, value);
  }
}

/**
 * 删除本地数据
 *
 * @param {any} key
 * @returns
 */
Tool.removeLocalItem = function (key) {
  if (key) {
    return localStorage.removeItem(key);
  }
  return localStorage.removeItem();
}
/**
 * 存储数据到公用对象
 * 对象名是StoreData
 * @param  key
 * @returns
 */
Tool.objMerger = function (obj1, obj2) {
  for (var r in obj2) {
    eval("obj1." + r + "=obj2." + r);
  }
  return obj1;
}

export {Tool, StoreData, config}
