'use strict'

const padLeft = require('left-pad')

module.exports = (input, line, col) => {
  if (!col) col = -1

  // split input by linebreaks
  let code = input.split('\n')

  // find line in input (count new lines)
  let start = code[line - 2] // line before error
  let error = code[line - 1] // line containing error

  // determine padding for the line numbers
  let pad = ''
  let errorPad = ''
  if ((line + 1).toString().length > line.toString().length) {
    pad = ' '
    errorPad = ' '
  } else if (line.toString().length > (line - 1).toString().length) {
    pad = ' '
  }

  // A little ugly, but we can handle line zero this way
  let frame = []
  if (line - 1 === 0) frame.push('   0. |')
  else frame.push(`   ${line - 1}.${pad} | ${start}`)
  frame.push(` > ${line}.${errorPad} | ${error}`)
  if (col !== -1) frame.push(`     ${pad} | ${padLeft('^', col, ' ')}`)
  frame.push(`   ${line + 1}. |`)

  return frame.join('\n')
}
