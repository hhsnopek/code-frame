# Code Frame
[![Travis]]()
[![Coveralls]]()
[![NPM]]()
[![L]][MIT]

Minimal Code Frame like babel-code-frame, but smaller

## Usage

```javascript
const framer = require('code-frame')

// framer(input, line[, col])
// input - string
// line  - int
// col   - int (optional)

framer('\nfunction (foo)\n{\tconsole.log(foo\n}', 2, 15)
//   1. |
// > 2. | function (foo)
//      |                ^
//   3. |

// Without col
framer('\n\n\tconsole.logfoo, bar)', 3)
//   2. |
// > 3. |   console.logfoo, bar)
//   4. |
```

## Development
requirements:
- node: 6.0  >=

cmds: `npm test`

[Travis]: //img.shields.io/travis/hhsnopek/code-frame.svg?maxAge=2592000?style=flat-square
[Coveralls]: //img.shields.io/coveralls/hhsnopek/code-frame.svg?maxAge=2592000?style=flat-square
[NPM]: //img.shields.io/npm/hhsnopek/code-frame.svg?maxAge=2592000?style=flat-square
[L]: //img.shields.io/npm/l/code-frame.svg?maxAge=2592000
[MIT]: license.md
