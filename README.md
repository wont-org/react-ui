[![Build Status](https://travis-ci.org/wont-org/react-ui.svg?branch=master)](https://travis-ci.org/wont-org/react-ui)

### 本地调试

使用 npm link @wont/react-ui 和 npm unlink @wont/react-ui

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
npm i @wont/react-ui -S
```

使用[babel-plugin-component](https://www.npmjs.com/package/babel-plugin-component)

```shell
npm i babel-plugin-component -D
```

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

与 xx 同时使用

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
