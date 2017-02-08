import Endpoint from './endpoint';
import Response from './response';

/**
 * Creates an endpoint hash.
 * The hash is a combination of the url and the method parameters. Guarantees uniqueness
 * for distinct inputs.
 *
 * @param  {String} url    The url to hash.
 * @param  {String} method The method to hash.
 * @return {String}        Returned unique hash.
 */
export function createEndpointHash(url, method) {
  return `url:${url}|method:${method}`;
}

/**
 * This class represents a fake server. The server serves endpoints registered with it.
 *
 * @class PseudoServer
 */
export default class Server {

  /**
   * Constructor.
   *
   * Takes a config-parameter which is the config of the server.
   *
   * @param  {Object} config A url-config associated with this pseudo-server.
   */
  constructor(config) {
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
  route(url='/', method='GET') {
    const endpoint = new Endpoint(url, method);
    const hash = createEndpointHash(url, method);
    if (hash in this.endpoints) {
      console.warn(`Overwriting ${hash}`);
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
  get(url) {
    return this.route(url, 'GET');
  }

  /**
   * Alias for route(url, 'POSt').
   *
   * @param  {String} url     The url of the endpoint.
   * @return {Endpoint} The resulting endpoint.
   */
  post(url) {
    return this.route(url, 'POST');
  }

  /**
   * Alias for route(url, 'PATCH').
   *
   * @param  {String} url     The url of the endpoint.
   * @return {Endpoint} The resulting endpoint.
   */
  patch(url) {
    return this.route(url, 'PATCH');
  }

  /**
   * Alias for route(url, 'PUT').
   *
   * @param  {String} url     The url of the endpoint.
   * @return {Endpoint} The resulting endpoint.
   */
  put(url) {
    return this.route(url, 'PUT');
  }

  /**
   * Alias for route(url, 'DELETE').
   *
   * @param  {String} url     The url of the endpoint.
   * @return {Endpoint} The resulting endpoint.
   */
  delete(url) {
    return this.route(url, 'DELETE');
  }

  /**
   * Alias for route(url, 'OPTIONS').
   *
   * @param  {String} url     The url of the endpoint.
   * @return {Endpoint} The resulting endpoint.
   */
  options(url) {
    return this.route(url, 'OPTIONS');
  }

  /**
   * Alias for route(url, 'HEAD').
   *
   * @param  {String} url     The url of the endpoint.
   * @return {Endpoint} The resulting endpoint.
   */
  head(url) {
    return this.route(url, 'HEAD');
  }

  /**
   * Calls this server.
   *
   * @param  {String} url    Request url
   * @param  {Object} config Request config
   * @return {Promise}       Promise
   */
  _call(url='', config={}) {
    const endpointHash = createEndpointHash(url, config.method || 'GET');
    const endpoint = this.endpoints[endpointHash];
    if (!endpoint) {
      return new Promise((resolve, reject) => {
        resolve(new Response({status: 404}));
      });
    }
    return endpoint._call(url, config);
  }
}
