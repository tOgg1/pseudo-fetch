'use strict';

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

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _server = require('./core/server');

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