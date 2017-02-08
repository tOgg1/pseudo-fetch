/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var required = __webpack_require__(9)
  , lolcation = __webpack_require__(10)
  , qs = __webpack_require__(8)
  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i;

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [
  ['#', 'hash'],                        // Extract from the back.
  ['?', 'query'],                       // Extract from the back.
  ['/', 'pathname'],                    // Extract from the back.
  ['@', 'auth', 1],                     // Extract from the front.
  [NaN, 'host', undefined, 1, 1],       // Set left over value.
  [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
];

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @return {ProtocolExtract} Extracted information.
 * @api private
 */
function extractProtocol(address) {
  var match = protocolre.exec(address);

  return {
    protocol: match[1] ? match[1].toLowerCase() : '',
    slashes: !!match[2],
    rest: match[3]
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @api private
 */
function resolve(relative, base) {
  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
    , i = path.length
    , last = path[i - 1]
    , unshift = false
    , up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} location Location defaults for relative paths.
 * @param {Boolean|Function} parser Parser for the query string.
 * @api public
 */
function URL(address, location, parser) {
  if (!(this instanceof URL)) {
    return new URL(address, location, parser);
  }

  var relative, extracted, parse, instruction, index, key
    , instructions = rules.slice()
    , type = typeof location
    , url = this
    , i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = qs.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '');
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (!extracted.slashes) instructions[2] = [/(.*)/, 'pathname'];

  for (; i < instructions.length; i++) {
    instruction = instructions[i];
    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      if (~(index = address.indexOf(parse))) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if (index = parse.exec(address)) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (
      relative && instruction[3] ? location[key] || '' : ''
    );

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (
      relative
    && location.slashes
    && url.pathname.charAt(0) !== '/'
    && (url.pathname !== '' || location.pathname !== '')
  ) {
    url.pathname = resolve(url.pathname, location.pathname);
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!required(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';
  if (url.auth) {
    instruction = url.auth.split(':');
    url.username = instruction[0] || '';
    url.password = instruction[1] || '';
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL}
 * @api public
 */
URL.prototype.set = function set(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || qs.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!required(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname +':'+ value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':'+ url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (/:\d+$/.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
      url.pathname = value.length && value.charAt(0) !== '/' ? '/' + value : value;

      break;

    default:
      url[part] = value;
  }

  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  url.href = url.toString();

  return url;
};

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String}
 * @api public
 */
URL.prototype.toString = function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

  var query
    , url = this
    , protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result = protocol + (url.slashes ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':'+ url.password;
    result += '@';
  }

  result += url.host + url.pathname;

  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

  if (url.hash) result += url.hash;

  return result;
};

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
URL.extractProtocol = extractProtocol;
URL.location = lolcation;
URL.qs = qs;

module.exports = URL;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _headers = __webpack_require__(0);

var _headers2 = _interopRequireDefault(_headers);

var _httpmethods = __webpack_require__(6);

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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.createEndpointHash = createEndpointHash;

var _endpoint = __webpack_require__(5);

var _endpoint2 = _interopRequireDefault(_endpoint);

var _response = __webpack_require__(3);

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates an endpoint hash.
 * The hash is a combination of the url and the method parameters. Guarantees uniqueness
 * for distinct inputs.
 *
 * @param  {String} url    The url to hash.
 * @param  {String} method The method to hash.
 * @return {String}        Returned unique hash.
 */
function createEndpointHash(url, method) {
  return 'url:' + url + '|method:' + method;
}

/**
 * This class represents a fake server. The server serves endpoints registered with it.
 *
 * @class PseudoServer
 */

var Server = function () {

  /**
   * Constructor.
   *
   * Takes a config-parameter which is the config of the server.
   *
   * @param  {Object} config A url-config associated with this pseudo-server.
   */
  function Server(config) {
    _classCallCheck(this, Server);

    this.config = config;
    this.endpoints = {};
  }

  /**
   * Registers a new route with the server. The method simply creates a new
   * Endpoint-instance, and adds it to the endpoints-dict of this server.
   *
   * @param  {String} url     The url of the endpoint.
   * @param  {String} method  The method it accepts requests to. Typically GET/POST etc.
   * @return {Endpoint} The resulting endpoint.
   */


  _createClass(Server, [{
    key: 'route',
    value: function route() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
      var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';

      var endpoint = new _endpoint2.default(url, method);
      var hash = createEndpointHash(url, method);
      if (hash in this.endpoints) {
        console.warn('Overwriting ' + hash);
      }

      this.endpoints[createEndpointHash(url, method)] = endpoint;
      return endpoint;
    }

    /**
     * Alias for route(url, 'GET').
     *
     * @param  {String} url     The url of the endpoint.
     * @return {Endpoint} The resulting endpoint.
     */

  }, {
    key: 'get',
    value: function get(url) {
      return this.route(url, 'GET');
    }

    /**
     * Alias for route(url, 'POSt').
     *
     * @param  {String} url     The url of the endpoint.
     * @return {Endpoint} The resulting endpoint.
     */

  }, {
    key: 'post',
    value: function post(url) {
      return this.route(url, 'POST');
    }

    /**
     * Alias for route(url, 'PATCH').
     *
     * @param  {String} url     The url of the endpoint.
     * @return {Endpoint} The resulting endpoint.
     */

  }, {
    key: 'patch',
    value: function patch(url) {
      return this.route(url, 'PATCH');
    }

    /**
     * Alias for route(url, 'PUT').
     *
     * @param  {String} url     The url of the endpoint.
     * @return {Endpoint} The resulting endpoint.
     */

  }, {
    key: 'put',
    value: function put(url) {
      return this.route(url, 'PUT');
    }

    /**
     * Alias for route(url, 'DELETE').
     *
     * @param  {String} url     The url of the endpoint.
     * @return {Endpoint} The resulting endpoint.
     */

  }, {
    key: 'delete',
    value: function _delete(url) {
      return this.route(url, 'DELETE');
    }

    /**
     * Alias for route(url, 'OPTIONS').
     *
     * @param  {String} url     The url of the endpoint.
     * @return {Endpoint} The resulting endpoint.
     */

  }, {
    key: 'options',
    value: function options(url) {
      return this.route(url, 'OPTIONS');
    }

    /**
     * Alias for route(url, 'HEAD').
     *
     * @param  {String} url     The url of the endpoint.
     * @return {Endpoint} The resulting endpoint.
     */

  }, {
    key: 'head',
    value: function head(url) {
      return this.route(url, 'HEAD');
    }

    /**
     * Calls this server.
     *
     * @param  {String} url    Request url
     * @param  {Object} config Request config
     * @return {Promise}       Promise
     */

  }, {
    key: '_call',
    value: function _call() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var endpointHash = createEndpointHash(url, config.method || 'GET');
      var endpoint = this.endpoints[endpointHash];
      if (!endpoint) {
        return new Promise(function (resolve, reject) {
          resolve(new _response2.default({ status: 404 }));
        });
      }
      return endpoint._call(url, config);
    }
  }]);

  return Server;
}();

exports.default = Server;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _response = __webpack_require__(3);

var _response2 = _interopRequireDefault(_response);

var _request = __webpack_require__(7);

var _request2 = _interopRequireDefault(_request);

var _headers = __webpack_require__(0);

var _headers2 = _interopRequireDefault(_headers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class represents an endpoint that can be called.
 * @class Endpoint
 */
var Endpoint = function () {

  /**
   * Constructs a Endpoint instance.
   *
   * @param  {string} url                       Url of the endpoint
   * @param  {string} method                    Method to listen for, typically GET, POST, PATCH, OPTIONS etc.
   * @param  {Function|Any} responseFunction   Responsefunction. Optional argument.
   */
  function Endpoint(url, method, responseFunction) {
    _classCallCheck(this, Endpoint);

    this.url = url || '/';
    this.method = method || 'GET';
    this.includeFunctions = [];
    this.excludeFunctions = [];
    this._status = 200;
    this.headers = new _headers2.default();
    this.responseFunction = responseFunction || function (req, res) {
      return 'Hello world';
    };
  }

  /**
   * Adds an accept-function to the endpoint. When called, the endpoint will
   * go through all accept-functions to check for truthness. If either does not return a truthy value,
   * the call will fail with a 400 Bad Request.
   *
   * @param  {Function}        condition The conditional function to check for
   *                                     The function should accept two parameters: url and config
   * @return {Endpoint}            This
   */


  _createClass(Endpoint, [{
    key: 'include',
    value: function include(condition) {
      this.includeFunctions.push(condition);
      return this;
    }

    /**
     * Adds an reject-function to the endpoint. When called, the endpoint will go through
     * all reject-functions (after the accept-functions) to check for falseness. If either does return a truthy value,
     * the call will fail with a 400 Bad Request.
     *
     * @param  {Function}       condition The conditiaonl function to check for
     * @return {Endpoint}           This
     */

  }, {
    key: 'exclude',
    value: function exclude(condition) {
      this.excludeFunctions.push(condition);
      return this;
    }

    /**
     * Sets a key-value pair of headers on this endpoint. This header will be sent back with any
     * response from this endpoint.
     *
     * @param {string}          key      Header key
     * @param {string}          value    Header value
     * @return {Endpoint}          this
     */

  }, {
    key: 'setHeader',
    value: function setHeader(key, value) {
      this.headers.append(key, value);
      return this;
    }

    /**
     * Defines the response to give when this endpoint is (succesfully) called.
     *
     * @param  {Function}       responseFunction The response function of the endpoint
     * @return {Endpoint}                  this
     */

  }, {
    key: 'respond',
    value: function respond(responseFunction) {
      this.responseFunction = responseFunction;
      return this;
    }

    /**
     * Alias for respond.
     *
     * @param  {Function}       responseFunction The response function of the endpoint
     * @return {Endpoint}                  this
     */

  }, {
    key: 'send',
    value: function send(responseFunction) {
      return this.respond(responseFunction);
    }

    /**
     * Sets the status of this endpoint.
     *
     * @param {int} status The status of this endpoint.
     * @return {Endpoint}                  this
     */

  }, {
    key: 'status',
    value: function status(_status) {
      this._status = _status;
      return this;
    }

    /**
     * Shortcut for setting the contentType header.
     *
     * @param  {String}   type  The contentType value.
     * @return {Endpoint}       this
     */

  }, {
    key: 'contentType',
    value: function contentType(type) {
      this.setHeader('Content-Type', type);
      return this;
    }

    /**
     * This method should be called when the endpoint is being requested.
     *
     * The method will perform all actions necessary to make the endpoint behave as expected
     * on the basis of its configuration.
     *
     * @param  {string}     url     The url of the endpoint
     * @param  {Object}     config  The object of the endpoint
     * @return {Response}           Epic
     */

  }, {
    key: '_call',
    value: function _call(url, config) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var request = new _request2.default(url, config);
        var response = new _response2.default();

        // Set it temporarily to 400, in case we return from an inclusion/exclusion
        // We do this so the user can override the 400 status if he/she wants to.
        response.status = 400;

        // Check for validity through include- and reject-conditions
        for (var i = 0; i < _this.includeFunctions.length; i++) {
          if (typeof _this.includeFunctions[i] === 'function') {
            var includeFunctionResult = _this.includeFunctions[i](request, response);
            if (!includeFunctionResult) {
              return resolve(response);
            }
          }
        }

        for (var _i = 0; _i < _this.excludeFunctions.length; _i++) {
          if (typeof _this.excludeFunctions[_i] === 'function') {
            var excludeFunctionResult = _this.excludeFunctions[_i](request, response);
            if (!!excludeFunctionResult) {
              return resolve(response);
            }
          }
        }

        // Okey nothing failed, set status back
        response.status = 200;

        response.status = _this._status;
        response.headers = _this.headers;
        _this._callResponseFunction(request, response);
        resolve(response);
      });
    }

    /**
     * Overloads the Response function. If this.responseFunction is a function,
     * it will be called. If it is anything else, it will be interpreted as the body
     * to return.
     *
     * @param  {Request}  request  The request object of the call
     * @param  {Response} response The response object of the call.
     */

  }, {
    key: '_callResponseFunction',
    value: function _callResponseFunction(request, response) {
      if (typeof this.responseFunction === 'function') {
        this.responseFunction(request, response);
      } else {
        response.body = this.responseFunction;
      }
    }
  }]);

  return Endpoint;
}();

exports.default = Endpoint;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  207: 'Multi-Status',
  208: 'Already Reported',
  226: 'IM Used',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Range Not Satisfiable',
  417: 'Expectation Failed',
  421: 'Misdirected Request',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  426: 'Upgrade Required',
  427: 'Unassigned',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  451: 'Unavailable For Legal Reasons',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',
  507: 'Insufficient Storage',
  508: 'Loop Detected',
  510: 'Not Extended',
  511: 'Network Authentication Required'
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _headers = __webpack_require__(0);

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

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?&]+)=?([^&]*)/g
    , result = {}
    , part;

  //
  // Little nifty parsing hack, leverage the fact that RegExp.exec increments
  // the lastIndex property so we can continue executing this loop until we've
  // parsed all results.
  //
  for (;
    part = parser.exec(query);
    result[decodeURIComponent(part[1])] = decodeURIComponent(part[2])
  );

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = [];

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (var key in obj) {
    if (has.call(obj, key)) {
      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
exports.stringify = querystringify;
exports.parse = querystring;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */
module.exports = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
    return port !== 80;

    case 'https':
    case 'wss':
    return port !== 443;

    case 'ftp':
    return port !== 21;

    case 'gopher':
    return port !== 70;

    case 'file':
    return false;
  }

  return port !== 0;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 }
  , URL;

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @api public
 */
module.exports = function lolcation(loc) {
  loc = loc || global.location || {};
  URL = URL || __webpack_require__(1);

  var finaldestination = {}
    , type = typeof loc
    , key;

  if ('blob:' === loc.protocol) {
    finaldestination = new URL(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new URL(loc, {});
    for (key in ignore) delete finaldestination[key];
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUrlConfigHash = createUrlConfigHash;
exports.fetch = fetch;
exports.mock = mock;
exports.restore = restore;
exports.overloadUrlconfig = overloadUrlconfig;

exports.default = function (arg0, arg1, arg2) {
  var urlConfig = overloadUrlconfig(arg0, arg1, arg2);
  var pseudoServer = new _server2.default(urlConfig);
  serverStore[createUrlConfigHash(urlConfig)] = pseudoServer;

  // We automatically mock if we haven't mocked before.
  // This makes our API easier, as we can just create a new Server instance,
  // and everything is taken care for us.
  // Note that originalFetch will never be undefined after the first mock, so for every
  // restore() after this call, one has to call mock() explicitly.
  if (originalFetch === undefined) {
    mock();
  }
  return pseudoServer;
};

var _urlParse = __webpack_require__(1);

var _urlParse2 = _interopRequireDefault(_urlParse);

var _server = __webpack_require__(4);

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A simple object holding all our registered servers.
 *
 * @type {Object}
 */
/**
 * @fileOverview This file contains the main class of the package,
 * which mocks the default fetch.
 *
 * @module PseudoFetch
 */
var serverStore = {};

/**
 * Variable containing the original fetch-method we "mock away".
 * We keep this stored, to make sure we can restore it at some point.
 *
 * @type {Function}
 */
var originalFetch = undefined;

/**
 * Creates a hash we can use to store a server from the
 * urlConfig parameters of the server.
 *
 * @param  {Object} urlConfig The urlconfig of a host.
 * @return {string}           The hash of the urlConfig
 */
function createUrlConfigHash(urlConfig) {
  var defaultResponse = 'host:|port:|protocol:';
  if (!urlConfig) {
    return defaultResponse;
  }
  return 'host:' + (urlConfig.host || '') + '|' + ('port:' + (urlConfig.port || '') + '|') + ('protocol:' + (urlConfig.protocol || ''));
}

/**
 * The mock-fetch function we use. The method simply invokes
 * the correct server with the url and config parameters.
 *
 * @param  {string}  url    The url to fetch.
 * @param  {Object}  config The config of the request.
 * @return {Promise}        A Promise which should resolve with the response of a server.
 *                          If no server exists, a Connection Refused Error will be thrown.
 */
function fetch(url, config) {
  var parsedUrl = (0, _urlParse2.default)(url);
  var urlHash = createUrlConfigHash(parsedUrl);
  var registeredServer = serverStore[urlHash];

  if (!registeredServer) {
    throw new Error('Connection refused, no server listening on ' + JSON.stringify(urlHash));
  }

  return registeredServer._call(parsedUrl.pathname, config);
}

/**
 * When invoked, this method will mock the global fetch-method.
 */
function mock() {
  if (typeof window !== 'undefined') {
    originalFetch = window.fetch;
    window.fetch = fetch;
  } else if (typeof global !== 'undefined') {
    originalFetch = global.fetch;
    global.fetch = fetch;
  } else {
    throw Error('Unable to find fetch, what environment are you running in?');
  }
}

/**
 * Restore the original global.fetch method.
 */
function restore() {
  if (typeof window !== 'undefined') {
    window.fetch = originalFetch;
  } else if (typeof global !== 'undefined') {
    global.fetch = originalFetch;
  }
}

/**
 * Overloads a set of config-arguments.
 *
 * @param  {null|undefined|string|Object} arg0 The first argument, either a full config,
 *                                             or a hostname, or undefined or null.
 * @param  {null|undefined|string}        arg1 The second argument. Either undefined or null or a port as a string.
 * @param  {null|undefined|string}         arg2 The third argument. Either undefined, null or a string representing
 *                                             the protocol.
 * @return {Object}                            A resulting urlConfig object.
 */
function overloadUrlconfig(arg0, arg1, arg2) {
  var defaultResponse = { host: '', port: '', protocol: '' };
  if (arg0 === undefined || arg0 === null) {
    return defaultResponse;
  }
  // Assume arg0 is the host, and arg1 is the port
  if (typeof arg0 === 'string') {
    return {
      host: arg0,
      port: arg1 || '',
      protocol: arg2 || ''
    };
    // Assume all info is in the object
  } else if (arg0.constructor === Object) {
    return arg0;
  } else {
    return defaultResponse;
  }
}

/**
 * The default export for this module. And the main entry-point
 * for creating new pseudo-servers.
 *
 * @param  {undefined|null|string|Object}  arg0 The first argument, either a full config, or a hostname.
 * @param  {undefined|null|string}    arg1 The second argument, possibly a port.
 * @param  {undefined|null|string}    arg2 The third argument. Either undefined, null or a string representing
 *                                             the protocol.
 * @return {Server}                  A Server instance.
 */
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ })
/******/ ]);