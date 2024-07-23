/**
 * omit
 * Utility function to create a shallow copy of an object which had dropped some fields.
 * @param {Object} obj - The object to copy.
 * @param {Array} fields - The fields to drop.
 * @returns {Object} - The new object.
 */

export function omit(obj, fields) {
  const shallowCopy = {...obj};
  for (let i = 0; i < fields.length; i++) {
    let key = fields[i];
    delete shallowCopy[key]
  }
  return shallowCopy;
}

export default omit;