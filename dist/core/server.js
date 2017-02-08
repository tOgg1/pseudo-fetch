'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.createEndpointHash = createEndpointHash;

var _endpoint = require('./endpoint');

var _endpoint2 = _interopRequireDefault(_endpoint);

var _response = require('./response');

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