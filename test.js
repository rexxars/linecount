var fs = require('fs')
var path = require('path')
var test = require('tape')
var linecount = require('./')
var lcPromised = require('./promise')

var getStream = function() {
  return fs.createReadStream(path.join(__dirname, 'fixtures', '74.txt'))
}

// Callback-style, file
test('counts correct lines for file', function (t) {
  linecount(path.join(__dirname, 'fixtures', '74.txt'), function (err, count) {
    t.ifError(err)
    t.equal(count, 74)
    t.end()
  })
})

test('errors on nonexistant file', function (t) {
  linecount(path.join(__dirname, 'fixtures', 'nope.txt'), function (err, count) {
    t.ok(err instanceof Error, 'should error')
    t.equal(err.code, 'ENOENT')
    t.end()
  })
})

// Promise-style, file
test('counts correct lines for file (promise)', function (t) {
  lcPromised(path.join(__dirname, 'fixtures', '74.txt')).then(function (count) {
    t.equal(count, 74)
    t.end()
  }).catch(function (err) {
    t.ifError(err)
    t.end()
  })
})

test('errors on nonexistant file (promise)', function (t) {
  lcPromised(path.join(__dirname, 'fixtures', 'nope.txt')).then(function (count) {
    t.fail('Should not succeed')
    t.end()
  }).catch(function (err) {
    t.ok(err instanceof Error, 'should error')
    t.equal(err.code, 'ENOENT')
    t.end()
  })
})

// Callback-style, stream
test('counts correct lines for file', function (t) {
  linecount(getStream(), function (err, count) {
    t.ifError(err)
    t.equal(count, 74)
    t.end()
  })
})

// Promise-style, stream
test('counts correct lines for file (promise)', function (t) {
  lcPromised(getStream()).then(function (count) {
    t.equal(count, 74)
    t.end()
  }).catch(function (err) {
    t.ifError(err)
    t.end()
  })
})
