const lc = require('./')

module.exports = function(file) {
  return new Promise(function(resolve, reject) {
    lc(file, function (err, count) {
      err ? reject(err) : resolve(count)
    })
  })
}
