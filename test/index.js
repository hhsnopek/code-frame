let test = require('ava')
let framer = require('..')

test('no column or options passed', (t) => {
  let error = framer('\nfunction (foo) {\n\tconsole.log(foo\n}', 3)
  let expected =
    '   2 | function (foo) {\n > 3 |   console.log(foo\n   4 | }'
  t.is(error, expected)
})

test('no options passed', (t) => {
  let error = framer('\nfunction (foo) {\n\tconsole.log(foo\n}', 3, 16)
  let expected =
    '   2 | function (foo) {\n > 3 |   console.log(foo\n     |                  ^'
  t.is(error, expected)
})

test('no options.tabSize passed', (t) => {
  let error = framer('\nfunction (foo) {\n\tconsole.log(foo\n}', 3, 16, { frameSize: 4 })
  let expected =
    '   2 | function (foo) {\n > 3 |   console.log(foo\n     |                  ^\n   4 | }'
  t.is(error, expected)
})

test('no options.frameSize passed', (t) => {
  let error = framer('\nfunction (foo) {\n\tconsole.log(foo\n}', 3, 16, { tabSize: 4 })
  let expected =
    '   2 | function (foo) {\n > 3 |     console.log(foo\n     |                    ^'
  t.is(error, expected)
})

test('all options passed', (t) => {
  let error = framer('\nfunction (foo) {\n\tconsole.log(foo\n}', 3, 16, { frameSize: 4, tabSize: 4 })
  let expected =
    '   2 | function (foo) {\n > 3 |     console.log(foo\n     |                    ^\n   4 | }'
  t.is(error, expected)
})

test('throws TypeError when code is not type String', (t) => {
  let error = t.throws(() => { framer(0, 3, 0) }, TypeError)
  t.is(error.message, 'code must be type String')
})

test('throws TypeError when line is not type Number', (t) => {
  let error = t.throws(() => { framer('', 'foo', 0) }, TypeError)
  t.is(error.message, 'line must be type Number')
})

test('throws TypeError when col is not type Number', (t) => {
  let error = t.throws(() => { framer('', 0, 'foo') }, TypeError)
  t.is(error.message, 'col must be type Number')
})

test('throws TypeError when options.frameSize is not type Number', (t) => {
  let error = t.throws(() => { framer('', 0, 0, { frameSize: 'foo' }) }, TypeError)
  t.is(error.message, 'options.frameSize must be type Number')
})

test('throws TypeError when options.tabSize is not type Number', (t) => {
  let error = t.throws(() => { framer('', 0, 0, { tabSize: 'foo' }) }, TypeError)
  t.is(error.message, 'options.tabSize must be type Number')
})

test('throws error when options.frameSize is between 2 and -2', (t) => {
  let error = t.throws(() => { framer('', 0, 0, { frameSize: 0 }) }, 'options.frameSize must be between -2 and 2')
  t.is(error.message, 'options.frameSize must be between -2 and 2')
})

test('throws error when options.tabSize is less than 1', (t) => {
  let error = t.throws(() => { framer('', 0, 0, { tabSize: 0 }) }, Error)
  t.is(error.message, 'options.tabSize must be greater than zero')
})

test('handles negative options.frameSize', (t) => {
  let error = framer('\nfunction (foo) {\n\tconsole.log(foo\n}\n', 3, 16, { frameSize: -5 })
  let expected =
    '   2 | function (foo) {\n > 3 |   console.log(foo\n     |                  ^\n   4 | }\n   5 | '
  t.is(error, expected)
})

test('handles error at line 1', (t) => {
  let error = framer('function (foo, bar\n{\n\tconsole.log(foo, bar)\n}', 1, 19)
  let expected =
    ' > 1 | function (foo, bar\n     |                   ^'
  t.is(error, expected)
})

test('handles error at EOF', (t) => {
  let error = framer('(function (foo, bar) {\n\tconsole.log(foo, bar)\n})(', 3, 4)
  let expected =
    '   2 |   console.log(foo, bar)\n > 3 | })(\n     |    ^'
  t.is(error, expected)
})

test('handles non-matching line number lengths at top of frame', (t) => {
  let error =
    framer('\n\n\n\n\n\n\n\nfunction(foo) {\n\tconsole.log(foo\n}', 10, 16)
  let expected =
    '    9 | function(foo) {\n > 10 |   console.log(foo\n      |                  ^'
  t.is(error, expected)
})

test('handles non-matching line number lengths at bottom of frame', (t) => {
  let error =
    framer('\n\n\n\n\n\n\nfunction(foo) {\n\tconsole.log(foo\n}', 9, 16, { frameSize: 4 })
  let expected =
    '    8 | function(foo) {\n >  9 |   console.log(foo\n      |                  ^\n   10 | }'
  t.is(error, expected)
})
