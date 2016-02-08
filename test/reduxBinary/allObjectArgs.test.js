import reduxBinary from '../../src';
import testReduxBinary from '../helpers/testReduxBinary';

const initialState = 1;
const onState = 1;
const offState = 0;
const suffix = 'editing';
const onActionName = 'edit';
const offActionName = 'stopEditing';

const suffixDef = { [suffix]: initialState };
const onActionDef = { [onActionName]: onState };
const offActionDef = { [offActionName]: offState };

const expected = {
  onActionName,
  offActionName,
  initialState,
  onState,
  offState,
  onActionTypeName: 'ON_EDITING',
  offActionTypeName: 'OFF_EDITING',
};

testReduxBinary(suffixDef, onActionDef, offActionDef, expected, (test) => {
  test('initial state must be one of ON or OFF state', t => {
    t.plan(1);

    t.throws(
      () => reduxBinary({ [suffix]: true }, onActionDef, offActionDef),
      'Initial state must match "ON" state or "OFF" state'
    );
  });

  test('onActionName and offActionName must be different', t => {
    t.plan(1);

    t.throws(
      () => reduxBinary(suffix, onActionDef, { [onActionName]: offState }),
      '"ON" action name and "OFF" action name cannot be the same'
    );
  });

  test('onState and offState must be different', t => {
    t.plan(1);

    t.throws(
      () => reduxBinary(
        suffix,
        onActionDef,
        { [offActionName]: onState }
      ),
      '"ON" state and "OFF" state cannot be the same'
    );
  });
});
