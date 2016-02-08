import reduxBinary from '../../src';
import testReduxBinary from '../helpers/testReduxBinary';

const initialState = true;
const suffix = 'editing';
const suffixDef = { [suffix]: initialState };
const onActionName = 'edit';
const offActionName = 'stopEditing';

const expected = {
  onActionName,
  offActionName,
  initialState,
  onActionTypeName: 'ON_EDITING',
  offActionTypeName: 'OFF_EDITING',
  onState: true,
  offState: false,
};

testReduxBinary(suffixDef, onActionName, offActionName, expected, (test) => {
  test('initial state must be one of ON or OFF state', t => {
    t.plan(1);

    t.throws(
      () => reduxBinary({ [suffix]: 1 }, onActionName, offActionName),
      'Initial state must match "ON" state or "OFF" state'
    );
  });

  test('suffixDef must have one key-value pair', t => {
    t.plan(2);

    t.throws(
      () => reduxBinary({}, onActionName, offActionName),
      'Object must have only one key-value pair'
    );

    t.throws(
      () => reduxBinary(
        { [suffix]: 1, foo: 'bar' },
        onActionName,
        offActionName
      ),
      'Object must have only one key-value pair'
    );
  });
});
