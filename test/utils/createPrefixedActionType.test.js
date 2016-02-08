import _test from 'ava';
import createPrefixedActionType from '../../src/utils/createPrefixedActionType';

test(
  'combines two words',
  'foo',
  'bar',
  'FOO_BAR'
);

test(
  'combines that are already upper snake cased',
  'foo_bar',
  'hello_world',
  'FOO_BAR_HELLO_WORLD'
);

test(
  'combines words that are camelCase',
  'fooBar',
  'helloWorld',
  'FOO_BAR_HELLO_WORLD'
);

test(
  'combines words that are dash-case',
  'foo-bar',
  'hello-world',
  'FOO_BAR_HELLO_WORLD'
);

test(
  'strips whitespace',
  '  foo ',
  ' bar  ',
  'FOO_BAR'
);

function test(desc, prefix, suffix, expected) {
  _test(desc, t => {
    t.plan(1);

    t.is(createPrefixedActionType(prefix, suffix), expected);
  });
}
