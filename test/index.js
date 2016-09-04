const test = require('ava')
const framer = require('..')

test('basic output', (t) => {
  let error = framer('\nfunction (foo) {\n\tconsole.log(foo\n}', 3, 24)
  let expected =
    '   2 | function (foo) {\n > 3 | \tconsole.log(foo\n     |                        ^\n   4 |'
  t.is(error, expected)
})

test('error at line 1', (t) => {
  let error = framer('function (foo, bar\n{\n\tconsole.log(foo, bar)\n}', 1, 19)
  let expected =
    '   0 |\n > 1 | function (foo, bar\n     |                   ^\n   2 |'
  t.is(error, expected)
})

test('no col passed', (t) => {
  let error = framer('\n\n\tconsole.logfoo, bar)', 3)
  let expected =
    '   2 | \n > 3 | \tconsole.logfoo, bar)\n   4 |'
  t.is(error, expected)
})

test('non-matching numPad lengths (startPad)', (t) => {
  let error =
    framer('\n\n\n\n\n\n\n\nfunction(foo) {\n\tconsole.log(foo\n}', 10, 23)
  let expected =
    '   9  | function(foo) {\n > 10 | \tconsole.log(foo\n      |                       ^\n   11 |'
  t.is(error, expected)
})

test('non-matching numPad lengths (errorPad)', (t) => {
  let error =
    framer('\n\n\n\n\n\n\nfunction(foo) {\n\tconsole.log(foo\n}', 9, 23)
  let expected =
    '   8  | function(foo) {\n > 9  | \tconsole.log(foo\n      |                       ^\n   10 |'
  t.is(error, expected)
})
