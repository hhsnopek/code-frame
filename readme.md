# Code Frame [![npm](https://img.shields.io/npm/v/code-frame.svg?style=flat-square)](https://npmjs.com/package/code-frame) [![tests](https://img.shields.io/travis/hhsnopek/code-frame.svg?style=flat-square)](https://travis-ci.org/hhsnopek/code-frame?branch=master) [![coverage](https://img.shields.io/coveralls/hhsnopek/code-frame.svg?style=flat-square)](https://coveralls.io/r/hhsnopek/code-frame?branch=master)
> Minimal Code Frame like babel-code-frame, but smaller

## Install
```bash
npm install --save code-frame
```

## Usage
```javascript
const framer = require('code-frame')

// framer(input, line[, col])
// input - string
// line  - int
// col   - int (optional)

framer('\nfunction (foo) {\n\tconsole.log(foo\n}', 3, 24)
//   2. | function (foo) {
// > 3. |         console.log(foo
//      |                        ^
//   4. |

// Without col
framer('\n\n\tconsole.logfoo, bar)', 3)
//   2. |
// > 3. |         console.logfoo, bar)
//   4. |
```

## License
MIT © [Henry Snopek](https://hhsnopek.com)
