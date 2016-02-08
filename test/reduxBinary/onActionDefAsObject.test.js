import reduxBinary from '../../src';
import testReduxBinary from '../helpers/testReduxBinary';

const suffix = 'editing';
const onActionName = 'edit';
const onState = 1;
const onActionDef = { [onActionName]: onState };
const offActionName = 'stopEditing';

const expected = {
  onActionName,
  offActionName,
  onState,
  onActionTypeName: 'ON_EDITING',
  offActionTypeName: 'OFF_EDITING',
  initialState: false,
  offState: false,
};

testReduxBinary(suffix, onActionDef, offActionName, expected, (test) => {
  test('onActionDef must have one key-value pair', t => {
    t.plan(2);

    t.throws(
      () => reduxBinary(suffix, {}, offActionName),
      'Object must have only one key-value pair'
    );

    t.throws(
      () => reduxBinary(
        suffix,
        { [onActionName]: onState, foo: 'bar' },
        offActionName
      ),
      'Object must have only one key-value pair'
    );
  });

  test('onActionName and offActionName must be different', t => {
    t.plan(1);

    t.throws(
      () => reduxBinary(suffix, onActionDef, onActionName),
      '"ON" action name and "OFF" action name cannot be the same'
    );
  });

  test('onState and offState must be different', t => {
    t.plan(1);

    t.throws(
      () => reduxBinary(
        suffix,
        { [onActionName]: expected.offState },
        offActionName
      ),
      '"ON" state and "OFF" state cannot be the same'
    );
  });
});
