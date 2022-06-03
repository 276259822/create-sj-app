## 初始化项目

`npm init -y`

## 添加命令

在`package.json`添加命令

```js
{
  "bin": {
    "create-sj-app": "./src/index.js",
    "csa": "./src/index.js"
  }
}
```

## 本地调试

执行`npm link` 或 `sudo npm link`，在`/usr/local/lib/node_modules/<package>`中创建一个链接到执行命令的包

同理`npm unlink`解除链接

## 使用

`yarn create sj-app`
1、全局安装`create-sj-app`
2、执行`create-sj-app`的`package.json`中`bin`

## github actions

## npm Access Tokens
