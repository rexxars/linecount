var fs = require('fs')
var isStream = require('is-stream')
var split2 = require('split2')

module.exports = function(filename, cb) {
  var count = 0
  var stream = isStream(filename) ? filename : fs.createReadStream(filename)

  stream
    .once('error', cb)
    .pipe(split2())
    .on('data', function () {
      count++
    })
    .on('end', function () {
      cb(null, count)
    })
}
