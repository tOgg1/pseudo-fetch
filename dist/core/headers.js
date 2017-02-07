"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class mocking the Headers class.
 */
var Headers = function () {

  /**
   * Constructs a new Headers object.
   *
   * @param  {Object} init The initial header info. Should be on the format:
   *                        {
   *                          headerKey: [headerValue1, headerValue2, ...] | headerValue,
   *                          ...
   *                        }
   */
  function Headers() {
    var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Headers);

    this._data = this._parseInit(init);
  }

  /**
   * Parses an init-object. If init is an Object, the object is expected to have either of the following formats:
   *
   *  {
   *    headerKey: [headerValue1, headerValue2, ...]
   *    ...
   *  }
   *
   * or
   * {
   *    headerKey: headerValue
   * }
   *
   * For all keys that has the first format, we simply leave the value field be.
   * For keys of the second format, we wrap the value in an Array.
   *
   * If init is a Headers-instance, we simply return it.
   *
   * @param  {Object|Header} init An init object
   * @return {Object}      Returns a parsed object on the format we expect.
   */


  _createClass(Headers, [{
    key: "_parseInit",
    value: function _parseInit(init) {
      if (init.constructor === Headers) {
        return Object.assign({}, init._data);
      } else if (init.constructor === Object) {
        Object.keys(init).forEach(function (key) {
          if (init[key].constructor !== Array) {
            init[key] = [init[key]];
          }
        });
        return init;
      } else {
        throw new Error("Invalid argument to Headers: Expected object of type Object or Headers,\n                       but got " + init.constructor.name);
      }
    }

    /**
     * Appends a key to the Headers. If the key already exists, the value
     * will be appended to the list of values. This distinguishes it from the
     * set function, which will simply override all values of the specific key.
     *
     * @param  {String} key   [description]
     * @param  {String} value [description]
     */

  }, {
    key: "append",
    value: function append(key, value) {
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

  }, {
    key: "delete",
    value: function _delete(key) {
      delete this._data[key];
    }

    /**
     * Returns an Iterator over all the entries of the Headers-object..
     * @return {Iterator} An iterator over all key-value entries of the Headers-object.
     */

  }, {
    key: "entries",
    value: function entries() {
      var _this = this;

      return this.keys().map(function (key) {
        return [key, _this._data[key]];
      });
    }

    /**
     * Gets the header-value specified by a header key.
     *
     * @param  {String} key A header-key.
     * @return {Array}      A header-value.
     */

  }, {
    key: "get",
    value: function get(key) {
      return this._data[key] || null;
    }

    /**
     * Alias for get.
     *
     * @return {Array} A header-value.
     */

  }, {
    key: "getAll",
    value: function getAll() {
      return this.get();
    }

    /**
     * Returns true if this Headers-object has a header as inidicated
     * by the key-argument.
     *
     * @param {String}    key The key to check for
     * @return {Boolean}      True if the Headers-object has the header, false if not.
     */

  }, {
    key: "has",
    value: function has(key) {
      return this._data.has(key);
    }

    /**
     * Returns and iterator over all the keys present in this Headers-object.
     *
     * @return {Iterator} All the keys of this Headers-object.
     */

  }, {
    key: "keys",
    value: function keys() {
      return Object.keys(this._data);
    }

    /**
     * Sets a header-key/value pair. Will overwrite all existing values of the specified key.
     *
     * @param {String} key   [description]
     * @param {String} value [description]
     */

  }, {
    key: "set",
    value: function set(key, value) {
      this._data[key] = [value];
    }

    /**
     * Returns an iterator over all the values present in this Headers-object.
     *
     * @return {Iterator} All the values of this Headers-object.
     */

  }, {
    key: "values",
    value: function values() {
      var _this2 = this;

      return this.keys().map(function (key) {
        return _this2._data[key];
      });
    }

    /**
     * Returns the amount of headers present in this Headers-Object.
     *
     * @return {Number} The amount.
     */

  }, {
    key: "length",
    get: function get() {
      return this.keys().length;
    }
  }]);

  return Headers;
}();

exports.default = Headers;