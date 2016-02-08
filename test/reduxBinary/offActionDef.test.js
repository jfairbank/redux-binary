import reduxBinary from '../../src';
import testReduxBinary from '../helpers/testReduxBinary';

const suffix = 'editing';
const onActionName = 'edit';
const offActionName = 'stopEditing';
const offState = 0;
const offActionDef = { [offActionName]: offState };

const expected = {
  onActionName,
  offActionName,
  offState,
  onActionTypeName: 'ON_EDITING',
  offActionTypeName: 'OFF_EDITING',
  initialState: offState,
  onState: true,
};

testReduxBinary(suffix, onActionName, offActionDef, expected, (test) => {
  test('offActionDef must have one key-value pair', t => {
    t.plan(2);

    t.throws(
      () => reduxBinary(suffix, onActionName, {}),
      'Object must have only one key-value pair'
    );

    t.throws(
      () => reduxBinary(
        suffix,
        onActionName,
        { [offActionName]: offState, foo: 'bar' }
      ),
      'Object must have only one key-value pair'
    );
  });

  test('onActionName and offActionName must be different', t => {
    t.plan(1);

    t.throws(
      () => reduxBinary(suffix, offActionName, offActionDef),
      '"ON" action name and "OFF" action name cannot be the same'
    );
  });

  test('onState and offState must be different', t => {
    t.plan(1);

    t.throws(
      () => reduxBinary(
        suffix,
        onActionName,
        { [offActionName]: expected.onState }
      ),
      '"ON" state and "OFF" state cannot be the same'
    );
  });
});
