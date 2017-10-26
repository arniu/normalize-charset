var assert = require('assert')
var normalizeCharset = require('..')

describe('normalizeCharset.normalize', function() {
  it('should normalize invalid charset', function() {
    var charset = normalizeCharset.normalize('utf8')
    assert.equal(charset, 'utf-8')
  })

  it('should pass valid charset', function() {
    var charset = normalizeCharset.normalize('utf-8')
    assert.equal(charset, 'utf-8')
  })

  it('should pass what unrecognized', function() {
    var inputs = [null, undefined, false, true, 123, '', {}]
    inputs.forEach(function(input) {
      assert.equal(input, normalizeCharset.normalize(input))
    })
  })
})
