'use strict'

const padLeft = require('left-pad')

module.exports = (input, line, col) => {
  if (!col) {
    col = -1
  }
  let code, start, error

  // split input by linebreaks
  code = input.split('\n')

  // find line in input (count new lines)
  start = code[line - 2] // line before error
  error = code[line - 1] // line containing error

  // A little ugly, but we can handle line zero this way
  let frame = []
  if (line - 1 === 0) frame.push('   0. |')
  else frame.push(`   ${line - 1}. | ${start}`)
  frame.push(` > ${line}. | ${error}`)
  if (col !== -1) frame.push(`      | ${padLeft('^', col, ' ')}`)
  frame.push(`   ${line + 1}. |`)

  return frame.join('\n')
}
