'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _headers = require('./headers');

var _headers2 = _interopRequireDefault(_headers);

var _httpmethods = require('./httpmethods');

var _httpmethods2 = _interopRequireDefault(_httpmethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class represents a mock of a window Response.
 * We have this class to be able to have a mutable version of a response.
 *
 * Some, but not all of a window.Response's functionalities are implemented. In particular,
 * all properties are implemented, and all mutating methods are implemented. None of the
 * Body-inherited methods are implemented, but is readily available after toWindowResponse is called.
 */
var Response = function () {

  /**
   * Constructor of the pseudoresponse.
   *
   * @param {Object} config
   */
  function Response() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Response);

    this._body = config.body || {};
    this._url = config.url || '';
    this._status = config.status || 200;
    this._statusMessage = _httpmethods2.default[this._status];
    this._headers = new _headers2.default(config.headers);
    this._ok = config.status >= 200 && config.status < 300;
    this._type = 'basic';
    this._useFinalUrl = false;
  }

  /**
   * Returns the body.
   *
   * @return {string|Object|Blob|FormData} Returns the body.
   */


  _createClass(Response, [{
    key: 'clone',


    /**
     * Clones the PseudoResponse and creates a new clone of the object. Identical in every
     * way, but stored in a different variable.
     *
     * @return {PseudoResponse}
     */
    value: function clone() {
      return new PseudoResponse({
        body: this.body,
        url: this.url,
        status: this.status,
        headers: this.headers
      });
    }

    /**
     * Creates a new Response that is a redirect to the specified url.
     *
     * @param {String} url The url to redirect to
     * @param {Number} status The status
     * @return {Response} A new Response object,
     */

  }, {
    key: 'redirect',
    value: function redirect(url, status) {
      return new PseudoResponse({
        body: this.body,
        url: url,
        status: status,
        headers: this.headers
      });
    }

    /**
     * Throws an error from the response.
     */

  }, {
    key: 'error',
    value: function error() {
      throw new Error('Connection refused: ' + this.url);
    }

    /**
     * Returns an arrayBuffer representation of the body, if possible.
     *
     * Currently not implemented.
     */

  }, {
    key: 'arrayBuffer',
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
      throw new Error('formData not implemented');
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
    key: 'body',
    get: function get() {
      return this._body;
    }

    /**
     * Sets the body.
     *
     * @param  {string|Object|Blob|FormData} body The body
     */
    ,
    set: function set(body) {
      this._body = body;
    }

    /**
     * Returns ok.
     *
     * @return {boolean}
     */

  }, {
    key: 'ok',
    get: function get() {
      return this._ok;
    }

    /**
     * Ok can not be set, so this method throws an Error.
     *
     * @param  {Number} ok
     */
    ,
    set: function set(ok) {
      throw new Error('ok is a read-only field, dependent on status. If you want ok to be true,\n                     set status in the range 200-299');
    }

    /**
     * Returns the status.
     *
     * @return {Number} The status
     */

  }, {
    key: 'status',
    get: function get() {
      return this._status;
    }

    /**
     * Sets the status of this response.
     * Also sets the ok-flag according to whether the status is in the range
     * 200-299.
     *
     * @param  {Number} status [description]
     */
    ,
    set: function set(status) {
      if (typeof status !== 'number') {
        throw new Error('Invalid argument given to set status. Expected number, got ' + (typeof status === 'undefined' ? 'undefined' : _typeof(status)));
      }
      this._status = status;
      this._statusMessage = _httpmethods2.default[status];
      this._ok = status >= 200 && status < 300;
    }

    /**
     * Gets the statusMessage.
     *
     * @return {String} The status message.
     */

  }, {
    key: 'statusMessage',
    get: function get() {
      return this._statusMessage;
    }

    /**
     * Tries to set the status message. Will always throw an error.
     * @param {String} message Argument, which will be ignored.
     */
    ,
    set: function set(message) {
      throw new Error('Unable to set status-message directly');
    }

    /**
     * Gets the headers of this response.
     *
     * @return {Headers} The headers of this response.
     */

  }, {
    key: 'headers',
    get: function get() {
      return this._headers;
    }

    /**
     * Sets the headers of this response.
     * If you want to set individual headers instead of the entire headers, object, you
     * should instead call get headers, and then edit the result in-place.
     *
     * @param  {Headers} headers The headers
     */
    ,
    set: function set(headers) {
      this._headers = headers;
    }

    /**
     * Sets the type.
     *
     * @param  {String} type The type to set. Typically 'basic', 'cors', 'error' or 'opaque'
     */

  }, {
    key: 'type',
    set: function set(type) {
      this._type = type;
    }

    /**
     * Returns the type.
     * @return {String} The type
     */
    ,
    get: function get() {
      return this._type;
    }

    /**
     * Sets the url.
     *
     * @param  {String} url A string-parameter representing the url.
     */

  }, {
    key: 'url',
    set: function set(url) {
      this._url = url;
    }

    /**
     * Gets the url.
     *
     * @return {String} The url.
     */
    ,
    get: function get() {
      return this._url;
    }

    /**
     * Sets the finalUrl.
     *
     * @param  {Boolean} useFinalUrl A boolean.
     */

  }, {
    key: 'useFinalUrl',
    set: function set(useFinalUrl) {
      this._useFinalUrl = useFinalUrl;
    }

    /**
     * Gets the finalUrl.
     *
     * @return {Boolean} Final url
     */
    ,
    get: function get() {
      return this._useFinalUrl;
    }
  }]);

  return Response;
}();

exports.default = Response;