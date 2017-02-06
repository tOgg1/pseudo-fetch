'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _response = require('./response');

var _response2 = _interopRequireDefault(_response);

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

var _headers = require('./headers');

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
    this.acceptFunctions = [];
    this.rejectFunctions = [];
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
      this.acceptFunctions.push(condition);
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
      this.rejectFunctions.push(condition);
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
        var request = new _request2.default();
        var response = new _response2.default();

        // Check for validity through accept and reject conditions
        for (var i = 0; i < _this.acceptFunctions.length; i++) {
          if (typeof _this.acceptFunctions[i] !== 'function' || !_this.acceptFunctions[i](url, config)) {
            reject(response.error());
          }
        }

        for (var _i = 0; _i < _this.rejectFunctions.length; _i++) {
          if (typeof _this.rejectFunctions[_i] !== 'function' || !!_this.rejectFunctions[_i](url, config)) {
            reject(response.error());
          }
        }

        // Okey, we are good, lets run the request.
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