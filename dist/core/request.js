'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _headers = require('./headers');

var _headers2 = _interopRequireDefault(_headers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class represents a request object.
 */
var Request = function () {

  /**
   * Construct a new Request.
   *
   * @param  {String} url  The url that the request should go to.
   * @param  {Object} init An init object taking all regular configurations of a fetch-request.
   */
  function Request(url) {
    var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Request);

    this._url = url || '';
    this._method = init.method || 'GET';
    this._headers = new _headers2.default(init.headers);
    this._body = init.body || '';
    this._mode = init.mode || 'cors';
    this._credentials = init.credentials || 'omit';
    this._cache = init.cache || 'default';
    this._redirect = init.redirect || 'follow';
    this._referrer = init.referrer || 'client';
    this._integrity = init.integrity || null;
    this._bodyUsed = false;
  }

  /**
   * The method of the Request.
   * @return {String} Typically something like GET, POST, etc.
   */


  _createClass(Request, [{
    key: 'arrayBuffer',


    /**
     * Returns an arrayBuffer representation of the body, if possible.
     *
     * Currently not implemented.
     */
    value: function arrayBuffer() {
      throw new Error('arrayBuffer not implemented');
    }

    /**
     * Returns a blob-representation of the body, if possible.
     *
     * Currently not implemented.
     */

  }, {
    key: 'blob',
    value: function blob() {
      throw new Error('arrayBuffer not implemented');
    }

    /**
     * Returns a formData-representation of the body, if possible.
     *
     * Currently not implemented.
     */

  }, {
    key: 'formData',
    value: function formData() {
      throw new Error('arrayBuffer not implemented');
    }

    /**
     * Returns a json-representation of the body, wrapped in a Promise, if possible.
     * @return {Promise} A promise which resolves with a json representation of the body.
     */

  }, {
    key: 'json',
    value: function json() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        try {
          // Resolve with an empty object is body is not truthy
          if (!_this.body) {
            resolve({});
          }
          // If we already have a parsed json-object, return it
          if (_this.body.constructor === Object) {
            resolve(_this.body);
          } else if (_this.body) {
            var parsed = JSON.parse(_this.body || '');
            resolve(parsed);
          } else {
            reject('Body is empty');
          }
        } catch (e) {
          reject(e);
        }
      });
    }

    /**
     * Returns a text-representation of the body, wrapped in a Promise, if possible.
     * @return {Promise}  A promise which resolves with a text-representation of the body.
     */

  }, {
    key: 'text',
    value: function text() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        try {
          resolve((_this2.body || '').toString());
        } catch (e) {
          reject(e);
        }
      });
    }
  }, {
    key: 'method',
    get: function get() {
      return this._method;
    }

    /**
     * The headers of the Request.
     * @return {Headers} The headers.
     */

  }, {
    key: 'headers',
    get: function get() {
      return this._headers;
    }

    /**
     * The cache policy of the Request.
     * @return {String} The cache policy.
     */

  }, {
    key: 'cache',
    get: function get() {
      return this._cache;
    }
    /**
     * Returns whether or not the body has been read yet.
     * @return {Boolean} True or false
     */

  }, {
    key: 'bodyUsed',
    get: function get() {
      return this._bodyUsed;
    }

    /**
     * Context is not supported, and will always return the empty string.
     * @return {String} ''
     */

  }, {
    key: 'context',
    get: function get() {
      return '';
    }

    /**
     * The mode of the Request.
     * @return {String} The mode.
     */

  }, {
    key: 'mode',
    get: function get() {
      return this._mode;
    }

    /**
     * The cache policy of the Request.
     * @return {String} The referrer.
     */

  }, {
    key: 'referrer',
    get: function get() {
      return this._referrer;
    }

    /**
     * The referrerPolicy of the Request. Note that this is the Http Referrer header.
     * @return {String} The referrerPolicy value:
     */

  }, {
    key: 'referrerPolicy',
    get: function get() {
      return this.headers.get('Referrer') || '';
    }

    /**
     * The url of the Request.
     * @return {String} The url.
     */

  }, {
    key: 'url',
    get: function get() {
      return this._url;
    }
  }]);

  return Request;
}();

exports.default = Request;