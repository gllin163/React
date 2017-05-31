### 目录结构
```shell
store-app        # 项目根目录
|-- config              # 配置文件
|   |-- dev.env.js      # 开发环境配置
|   |-- index.js        # 根据NODE_ENV引入配置
|   |-- prod.env.js     # 生产环境配置
|   `--- test.env.js    # 测试环境配置
|-- resource            # 资源文件 nginx.conf psd等
|-- src                 # 项目代码目录
|   |-- Action          # react action目录
|   |-- Component       # react 公用组件目录
|   |-- Config          # react 配置
|   `---- Route.jsx     # 路由 配置
|   `---- Route.jsx     # store 配置
|   |-- Container       # react 容器
|   `---- App.jsx       # 入口文件 配置
|   `---- Laout.jsx     # 适配手机端布局
|   `---- Tool.jsx      # 工具化配置
|   |-- Iconfont        # react 字体库
|   |-- Reducer         # react reducer目录
|   |-- Style           # react 公用样式
|   |-- Template        # 页面模板 整个应用的入口 index.html
`-- static              # 静态资源目录
```

### 运行（nodejs 6.0+）
```bash
  npm run dev #(开发版本访问：http://localhost:3000/)
```

### 文档
[redux](http://cn.redux.js.org/docs/react-redux/api.html)
[react](http://wiki.jikexueyuan.com/project/react/)
[react-route](http://react-guide.github.io/react-router-cn/)
[webpack](http://webpack.github.io/docs/configuration.html)
[antd-mobile](https://mobile.ant.design/docs/react/introduce)
[es6](http://es6.ruanyifeng.com/)
