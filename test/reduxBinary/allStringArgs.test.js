import reduxBinary from '../../src';
import testReduxBinary from '../helpers/testReduxBinary';

const suffix = 'editing';
const onActionName = 'edit';
const offActionName = 'stopEditing';

const expected = {
  onActionName,
  offActionName,
  onActionTypeName: 'ON_EDITING',
  offActionTypeName: 'OFF_EDITING',
  initialState: false,
  onState: true,
  offState: false,
};

testReduxBinary(suffix, onActionName, offActionName, expected, (test) => {
  test('onActionName and offActionName must be different', t => {
    t.plan(1);

    t.throws(
      () => reduxBinary(suffix, onActionName, onActionName),
      '"ON" action name and "OFF" action name cannot be the same'
    );
  });
});
