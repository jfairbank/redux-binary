import test from 'ava';
import retrieveSinglePair from '../../src/utils/retrieveSinglePair';

test('returns the key and value as an array pair', t => {
  t.plan(1);

  t.same(retrieveSinglePair({ foo: 'bar' }), ['foo', 'bar']);
});

test('throws if there is no key-value pair', t => {
  t.plan(1);

  t.throws(
    () => retrieveSinglePair({}),
    'Object must have only one key-value pair'
  );
});

test('throws if there is more than one key-value pair', t => {
  t.plan(1);

  t.throws(
    () => retrieveSinglePair({
      foo: 'bar',
      hello: 'world',
    }),
    'Object must have only one key-value pair'
  );
});
