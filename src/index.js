import isPlainObject from 'lodash/isPlainObject';
import invariant from 'invariant';
import retrieveSinglePair from './utils/retrieveSinglePair';
import createPrefixedActionType from './utils/createPrefixedActionType';

/**
 * Create a reducer and actions for toggling between an "on" and "off"
 * binary state.
 *
 * @param {string|object} suffixDef Suffix name to use for creating the action
 * type names. If an object is passed in, then it must be a single key-value
 * pair where the key is `suffix` name and the value is initial state value.
 * @param {string|object} onActionDef Name of action for "on" state. If an
 * object is passed in, then it must be a single key-value pair where the key
 * is `onActionName` and the value is the "on" state value.
 * @param {string|object} offActionDef Name of action for "off" state. If an
 * object is passed in, then it must be a single key-value pair where the key
 * is `offActionName` and the value is the "off" state value.
 */
export default function reduxBinary(suffixDef, onActionDef, offActionDef) {
  let suffix = suffixDef;
  let onActionName = onActionDef;
  let offActionName = offActionDef;
  let onState = true;
  let offState = false;
  let haveCustomState = false;

  if (isPlainObject(onActionDef)) {
    haveCustomState = true;
    [onActionName, onState] = retrieveSinglePair(onActionName);
  }

  if (isPlainObject(offActionName)) {
    haveCustomState = true;
    [offActionName, offState] = retrieveSinglePair(offActionName);
  }

  invariant(
    onActionName !== offActionName,
    '"ON" action name and "OFF" action name cannot be the same'
  );

  if (haveCustomState) {
    invariant(
      onState !== offState,
      '"ON" state and "OFF" state cannot be the same'
    );
  }

  let initialState = offState;

  if (isPlainObject(suffixDef)) {
    [suffix, initialState] = retrieveSinglePair(suffix);

    invariant(
      initialState === onState || initialState === offState,
      'Initial state must match "ON" state or "OFF" state'
    );
  }

  const onActionType = createPrefixedActionType('on', suffix);
  const offActionType = createPrefixedActionType('off', suffix);

  return {
    actions: {
      [onActionName]:  () => ({ type: onActionType }),
      [offActionName]: () => ({ type: offActionType }),
    },

    actionTypes: { ON: onActionType, OFF: offActionType },

    reducer(state = initialState, action) {
      switch (action.type) {
        case onActionType:  return onState;
        case offActionType: return offState;
        default:            return state;
      }
    },
  };
}
