# Normalize Charset

[![Travis](https://img.shields.io/travis/arniu/normalize-charset.svg)](https://travis-ci.org/arniu/normalize-charset)
[![npm](https://img.shields.io/npm/v/normalize-charset.svg)](https://www.npmjs.com/package/normalize-charset)

Map charset to its normalized form, for example **UTF8** to **UTF-8**.

## Motivation

Encoding is a big thing. Terms like **UTF8**, **UTF16** are widely used, but not exist according to [RFC 5987][rfc5987].

This module is to solve problems like [Error: unsupported charset "UTF8"][issue50].

## Installation

```
npm install normalize-charset
```

## Use as [express][express] middleware

```javascript
app.use(require('normalize-charset').middleware)
```

## Use to patch [content-type][content-type]

```javascript
require('normalize-charset').patchContentType()
```

> [content-type][content-type] is used to parse charset by [body-parser][body-parser]


[rfc5987]: https://tools.ietf.org/html/rfc5987
[issue50]: https://github.com/expressjs/body-parser/issues/50
[content-type]: https://www.npmjs.com/package/content-type
[body-parser]: https://www.npmjs.com/package/body-parser
[express]: https://www.npmjs.com/package/express
