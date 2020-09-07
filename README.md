[![Build Status](https://travis-ci.org/wont-org/react-ui.svg?branch=master)](https://travis-ci.org/wont-org/react-ui)

### 本地调试
使用npm link @wont/react-ui和npm unlink @wont/react-ui
```bash
## 到@wont/react-ui工程下执行
npm link

## 到业务工程下执行
npm link @wont/react-ui

## 取消本地调试执行
npm unlink @wont/react-ui
```

### 使用
npm install @wont/react-ui
```shell
npm install @wont/react-ui --save-dev
```
使用[babel-plugin-component](https://www.npmjs.com/package/babel-plugin-component)

.babelrc.js

```js
"plugins": [
  [
    "component", {
      "libraryName": "@wont/react-ui",
      "libDir": "lib",
      "style": "index.css"
    }
  ]
]
```
与xx同时使用
```js
"plugins": [
  [
    "component", [
        {
            "libraryName": "xx",
            "style": true
        },
        {
            "libraryName": "@wont/react-ui",
            "libDir": "lib",
            "style": "index.css"
        }
    ]
  ]
]
```
