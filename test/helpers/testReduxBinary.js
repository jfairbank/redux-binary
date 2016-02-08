import test from 'ava';
import reduxBinary from '../../src';

export default function testReduxBinary(
  suffix, onActionDef, offActionDef, expected, addlTests
) {
  const { reducer, actions, actionTypes } = reduxBinary(
    suffix, onActionDef, offActionDef
  );

  test('the ON actionType is the prefixed suffix', t => {
    t.plan(1);

    t.is(actionTypes.ON, expected.onActionTypeName);
  });

  test('the OFF actionType is the prefixed suffix', t => {
    t.plan(1);

    t.is(actionTypes.OFF, expected.offActionTypeName);
  });

  test('the actions are keyed by the ON and OFF action names', t => {
    t.plan(3);

    const keys = Object.keys(actions);

    t.is(keys.length, 2, 'has only two keys');
    t.ok(keys.indexOf(expected.onActionName) > -1, 'has the ON action name');
    t.ok(keys.indexOf(expected.offActionName) > -1, 'has the OFF action name');
  });

  test('the ON action returns the ON action type', t => {
    t.plan(1);

    t.same(actions[expected.onActionName](), { type: actionTypes.ON });
  });

  test('the OFF action returns the OFF action type', t => {
    t.plan(1);

    t.same(actions[expected.offActionName](), { type: actionTypes.OFF });
  });

  test(`the reducer initial state is ${expected.initialState}`, t => {
    t.plan(1);

    t.is(reducer(undefined, { type: 'FAKE_TYPE' }), expected.initialState);
  });

  test('the reducer returns the "on" state', t => {
    t.plan(1);

    t.is(
      reducer(expected.offState, { type: actionTypes.ON }),
      expected.onState
    );
  });

  test('the reducer returns the "off" state', t => {
    t.plan(1);

    t.is(
      reducer(expected.onState, { type: actionTypes.OFF }),
      expected.offState
    );
  });

  if (typeof addlTests === 'function') {
    addlTests(test);
  }
}
