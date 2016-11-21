'use strict'

const padLeft = require('left-pad')
// Line 0 does not exist
// Line 1 is code[0]

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

module.exports = (code, line, col, opts) => {
  // parse options
  if (!col) col = -1
  let frameSize = (opts && opts.hasOwnProperty('frameSize')) ? opts.frameSize : 3
  let tabSize = (opts && opts.hasOwnProperty('tabSize')) ? opts.tabSize : 2

  // handle bad params
  if (typeof code !== 'string') throw new TypeError('code must be type String')
  if (typeof line !== 'number') throw new TypeError('line must be type Number')
  if (typeof col !== 'number') throw new TypeError('col must be type Number')
  if (typeof frameSize !== 'number') throw new TypeError('options.frameSize must be type Number')
  if (typeof tabSize !== 'number') throw new TypeError('options.tabSize must be type Number')
  if (frameSize < 2 && frameSize > -2) throw new Error('options.frameSize must be between -2 and 2')
  if (tabSize < 1) throw new Error('options.tabSize must be greater than zero')

  // frame type
  let reverseFrame = false
  if (frameSize < 0) { // Negative number passed
    frameSize = /\d+/g.exec(frameSize.toString())[0]
    reverseFrame = true
  }

  // frame calculations
  frameSize = frameSize - 1 // remove offending-line from frame count
  let odd = Boolean(frameSize % 2)
  let border = odd ? ((frameSize - 1) / 2) : (frameSize / 2)
  let linesBefore = border
  let linesAfter = border
  if (col !== -1 && frameSize !== 3) linesAfter = linesAfter - 1
  if (reverseFrame) {
    let tmp = linesBefore
    linesBefore = linesAfter
    linesAfter = tmp
  }

  // split code by linebreaks
  code = code.split('\n')

  // builder vars
  let offendingLine = line - 1 // offset by one for array indexing
  let top = offendingLine - linesBefore
  let bottom = offendingLine + linesAfter
  let padding = ''
  let nextPadding = ''

  let frame = []
  // build from bottom to top to determine left padding
  for (; bottom >= top; bottom--) {
    let nextFrame = ((bottom - 1) >= 0) // do not bottom out on array

    // determine padding
    if (nextPadding.length !== 0) {
      padding = nextPadding
    } else if ((bottom + 1).toString().length > bottom.toString().length) {
      nextPadding = ' '
    }

    let line = code[bottom] // current line

    // replace tabs with spaces
    let tabAmt = (line.match(/\u0009/g) || []).length
    if (tabAmt > 0) {
      let tab = ' '.repeat(tabSize)
      if (col !== -1) col = col + tab.length
      line = line.replace(/\t/g, tab)
    }

    // found the offending line
    if (bottom === offendingLine) {
      // get gutter spacing
      let errGutter = ' '.repeat(bottom.toString().length)
      if (nextPadding.length !== 0 && nextPadding !== padding) errGutter += ' '
      if (col !== -1) {
        frame.unshift(`   ${padding}${errGutter} | ${padLeft('^', col, ' ')}`)
      }

      frame.unshift(` > ${padding}${bottom + 1} | ${line}`)
    } else {
      frame.unshift(`   ${padding}${bottom + 1} | ${line}`)
    }

    if (!nextFrame) break
  }

  return frame.join('\n')
}
