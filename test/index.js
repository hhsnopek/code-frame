const test = require('ava')
const framer = require('..')

test('basic output', (t) => {
  let error = framer('\nfunction (foo)\n{\tconsole.log(foo\n}', 2, 15)
  let expected =
    '   1. | \n > 2. | function (foo)\n      |                ^\n   3. |'
  t.is(error, expected)
})

test('error at line 1', (t) => {
  let error = framer('function (foo, bar\n{\tconsole.log(foo, bar)\n}', 1, 17)
  let expected =
    '   0. |\n > 1. | function (foo, bar\n      |                  ^\n   2. |'
  t.is(error, expected)
})

test('no col passed', (t) => {
  let error = framer('\n\n\tconsole.logfoo, bar)', 3)
  let expected =
    '   2. | \n > 3. | \tconsole.logfoo, bar)\n   4. |'
  t.is(error, expected)
})
