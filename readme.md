# Code Frame [![npm](https://img.shields.io/npm/v/code-frame.svg?style=flat-square)](https://npmjs.com/package/code-frame) [![tests](https://img.shields.io/travis/hhsnopek/code-frame.svg?style=flat-square)](https://travis-ci.org/hhsnopek/code-frame?branch=master) [![coverage](https://img.shields.io/coveralls/hhsnopek/code-frame.svg?style=flat-square)](https://coveralls.io/r/hhsnopek/code-frame?branch=master)
> Minimal Code Frame like babel-code-frame, but smaller

## Install
```bash
npm install --save code-frame
```

## Usage
```javascript
const framer = require('code-frame')

// framer('...', OffendingLine, OffendingColumn, {
//   frameSize: 3,
//   tabSize: 2
// })

// Opts:
//   'frameSize': (default: 3)
//       This is calcuation is Line - Surrounding.
//       If you provide, 3, it will capture a total of two surrounding lines.
//           2 | function (foo) {
//         > 3 |   console.log(foo
//             |                  ^
//
//       The frame is formed from bottom to top. ex: 4 = ((3 - 1) / 2) gives us 1
//       line on top and bottom. If you provide an even number, 4, you'd result in
//       2 lines above and one below.
//           2 | var bar = function (foo) {
//         > 3 |   console.log(foo
//             |                  ^
//           4 |   foo = foo ? foo : 'baz'
//
//       Inorder to get the opposite result you'd inverse the frameSize, -4
//           1 | // function bar
//           2 | var bar = function (foo) {
//         > 3 |   console.log(foo
//             |                  ^
//
//       Caveats:
//         frame cuts off if the wrapping lines hit EOF/Start of File. If the
//         frameSize is 3 and the error is on line 1:
//           > 1 | 'use strict;
//               |            ^
//
//   'tabSize': (default: 2)
//     If mixed tabs are found on anylines while constructing the frame, we
//     convert them over to spaces. You may define a positive integer.
```

## License
MIT © [Henry Snopek](https://hhsnopek.com)
