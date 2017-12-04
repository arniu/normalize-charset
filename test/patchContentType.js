var assert = require('assert')
var contentType = require('content-type')
var normalizeCharset = require('..')

before(function () {
  normalizeCharset.patchContentType()
})

describe('normalizeCharset.patchContentType', function () {
  it('contentType.parse should correct charset', function () {
    var parsed = contentType.parse('text/html; charset=utf8')
    assert.equal(parsed.type, 'text/html')
    assert.deepEqual(parsed.parameters, {
      charset: 'utf-8'
    })
  })

  it('contentType.parse should pass if charset not given', function () {
    var parsed = contentType.parse('text/html')
    assert.equal(parsed.type, 'text/html')
    assert.deepEqual(parsed.parameters, {})
  })

  it('contentType.format should correct charset', function () {
    var formatted = contentType.format({
      type: 'text/html',
      parameters: { charset: 'utf8' }
    })

    assert.equal(formatted, 'text/html; charset=utf-8')
  })

  it('contentType.format should pass if charset not given', function () {
    var formatted = contentType.format({ type: 'text/html' })
    assert.equal(formatted, 'text/html')
  })
})
