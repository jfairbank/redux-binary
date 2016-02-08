import snakeCase from 'lodash/snakeCase';

/**
 * Combine a prefix and suffix to make an action type name.
 *
 * @param {string} prefix
 * @param {string} suffix
 */
export default function createPrefixedActionType(prefix, suffix) {
  return snakeCase(`${prefix}_${suffix}`).toUpperCase();
}
