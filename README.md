# linecount

Counts number of lines in a file (or a stream)

## Installation

```
npm install --save linecount
```

## Usage

```js
var linecount = require('linecount')

linecount('/usr/share/dict/words', (err, count) => {
  if (err) {
    throw err
  }

  console.log(count) // 99171
})

// Or, promised:
var linecount = require('linecount/promise')

linecount('/usr/share/dict/words')
  .then(count => console.log(count))
  .catch(err => console.error(err))

// You can also pass a stream. Note that this will drain the stream though, so you can't read from the same stream after counting it:
linecount(fs.createReadStream('/usr/share/dict/words'))
  .then(count => console.log(count))
  .catch(err => console.error(err))
```

## License

MIT-licensed. See LICENSE.
