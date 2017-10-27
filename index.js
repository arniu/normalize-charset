var CHARSET_MAP = {
  utf8: 'utf-8',
  utf16: 'utf-16'
}

var CHARSET_RE = /(charset\s{0,10}=\s{0,10}['"]? {0,10})([\w\-]{1,100})/i

var CONTENT_TYPE = 'content-type'

/**
 *
 * Normalize Charset
 *
 * @param {?string} charset
 * @return {?string}
 */
function normalize(charset) {
  if (typeof charset === 'string') {
    return CHARSET_MAP[charset.toLowerCase()] || charset
  }

  return charset
}

/**
 *
 * Connect-styled middleware to correct charset
 *
 * @param req
 * @param res
 * @param next
 */
function middleware(req, res, next) {
  if (req.headers[CONTENT_TYPE]) {
    req.headers[CONTENT_TYPE] = req.headers[CONTENT_TYPE].replace(
      CHARSET_RE,
      function(match, leading, charset) {
        return leading + normalize(charset)
      }
    )
  }

  next()
}

/**
 * Patch `content-type` to correct charset
 */
function patchContentType() {
  try {
    var contentType = require('content-type')
    if (contentType.__PATCHED__ALREADY__) {
      return
    }

    contentType.__PATCHED__ALREADY__ = true

    var parse = contentType.parse
    contentType.parse = function(arg) {
      var obj = parse(arg)
      if (obj && obj.parameters.charset) {
        obj.parameters.charset = normalize(obj.parameters.charset)
      }

      return obj
    }

    var format = contentType.format
    contentType.format = function(arg) {
      if (arg && arg.parameters && arg.parameters.charset) {
        arg.parameters.charset = normalize(arg.parameters.charset)
      }

      return format(arg)
    }
  } catch (err) {
    throw new Error('`content-type` not installed')
  }
}

exports.normalize = normalize
exports.middleware = middleware
exports.patchContentType = patchContentType
