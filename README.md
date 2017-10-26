# Normalize Charset

编码是个大问题。

像 UTF8、UTF16 这些称谓，严格来讲并无此类编码，但约定俗成，文档或者编码中会经常用到。

碰到那些严厉的主儿，比如 [Error: unsupported charset "UTF8"](https://github.com/expressjs/body-parser/issues/50)，愣是声称
这些不合标准，不予支持，就会导致一些第三方服务（比如支付宝的异步通知）没法用。

但我们是个和事佬，错了，那就默默帮你纠正过来呗~

## 安装

```
npm install normalize-charset
```

## 用作 `express` 中间件

```javascript
app.use(require('normalize-charset').middleware)
```

## 给 `content-type` 打补丁

```javascript
require('normalize-charset').patchContentType()
```
