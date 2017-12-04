var request = require('supertest')
var normalizeCharset = require('..')

function makeApp () {
  var app = require('express')()
  var contentType = require('content-type')
  app.use(normalizeCharset.middleware)
  app.use(function (req, res) {
    try {
      var parsed = contentType.parse(req)
      res.status(200).json({
        charset: parsed.parameters.charset
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  })

  return app
}

describe('normalizeCharset.middleware', function () {
  var app = makeApp()

  it('should correct utf8 to utf-8', function (done) {
    request(app)
      .get('/anywhere')
      .set('Content-Type', 'application/json; charset=utf8')
      .expect(200, {
        charset: 'utf-8'
      })
      .end(function (err, res) {
        if (err) return done(err)
        done()
      })
  })

  it('should pass if charset not given', function (done) {
    request(app)
      .get('/anywhere')
      .set('Content-Type', 'application/json')
      .expect(
        200,
        // ignore undefined
        JSON.stringify({
          charset: undefined
        })
      )
      .end(function (err, res) {
        if (err) return done(err)
        done()
      })
  })

  it('should fail if content-type not given', function (done) {
    request(app)
      .get('/anywhere')
      .expect(500)
      .end(function (err, res) {
        if (err) return done(err)
        done()
      })
  })
})
