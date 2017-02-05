/**
 * Class mocking the Headers class.
 */
export default class Headers {

  /**
   * Constructs a new Headers object.
   *
   * @param  {Object} init The initial header info. Should be on the format:
   *                        {
   *                          headerKey: [headerValue1, headerValue2, ...],
   *                          ...
   *                        }
   */
  constructor(init) {
    this._data = init || {};
  }

  /**
   * Appends a key to the Headers. If the key already exists, the value
   * will be appended to the list of values. This distinguishes it from the
   * set function, which will simply override all values of the specific key.
   *
   * @param  {String} key   [description]
   * @param  {String} value [description]
   */
  append(key, value) {
    if (key in this._data) {
      this._data[key].append(value);
    } else {
      this._data[key] = [value];
    }
  }

  /**
   * Deletes the header defined by the key-argument.
   *
   * @param {String} key A header-key, (e.g. Accept or Content-Type).
   */
  delete(key) {
    delete this._data[key];
  }

  /**
   * Returns an Iterator over all the entries of the Headers-object..
   * @return {Iterator} An iterator over all key-value entries of the Headers-object.
   */
  entries() {
    return this.keys().map((key) => [key, this._data[key]]);
  }

  /**
   * Gets the header-value specified by a header key.
   *
   * @param  {[type]} key A header-key.
   * @return {Array}      A header-value.
   */
  get(key) {
    return this._data[key] || null;
  }

  /**
   * Alias for get.
   *
   * @return {Array} A header-value.
   */
  getAll() {
    return this.get();
  }

  /**
   * Returns true if this Headers-object has a header as inidicated
   * by the key-argument.
   *
   * @param {String}    key The key to check for
   * @return {Boolean}      True if the Headers-object has the header, false if not.
   */
  has(key) {
    return this._data.has(key);
  }

  /**
   * Returns and iterator over all the keys present in this Headers-object.
   *
   * @return {Iterator} All the keys of this Headers-object.
   */
  keys() {
    return Object.keys(this._data);
  }

  /**
   * Sets a header-key/value pair. Will overwrite all existing values of the specified key.
   *
   * @param {[type]} key   [description]
   * @param {[type]} value [description]
   */
  set(key, value) {
    this._data[key] = [value];
  }

  /**
   * Returns an iterator over all the values present in this Headers-object.
   *
   * @return {Iterator} All the values of this Headers-object.
   */
  values() {
    return this.keys().map((key) => this._data[key]);
  }

  /**
   * Returns the amount of headers present in this Headers-Object.
   *
   * @return {Number} The amount.
   */
  get length() {
    return this.keys().length;
  }
}
