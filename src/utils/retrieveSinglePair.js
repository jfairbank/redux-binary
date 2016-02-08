import invariant from 'invariant';

/**
 * Returns the single key-value pair from an object.
 *
 * @param {Object} object
 * @throws Requires that there only be one key-value pair in `object`
 */
export default function retrieveSinglePair(object) {
  const keys = Object.keys(object);

  invariant(
    keys.length === 1,
    'Object must have only one key-value pair'
  );

  return [keys[0], object[keys[0]]];
}
