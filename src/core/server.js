import Endpoint from './endpoint';

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
    this.paths = {};
  }

  /**
   * Registers a new route with the server. The method simply creates a new
   * PseudoEndpoint-instance, and adds it to the paths-dict of this server.
   *
   * @param  {String} url     The url of the endpoint.
   * @param  {String} method  The method it accepts requests to. Typically GET/POST etc.
   * @return {PseudoEndpoint} The resulting endpoint.
   */
  route(url, method) {
    const endpoint = new PseudoEndpoint(url, method);
    const hash = createEndpointHash(url, method);
    if (hash in this.paths) {
      console.warn(`Overwriting ${hash}`);
    }

    this.paths[createEndpointHash(url, method)] = endpoint;
    return endpoint;
  }

  /**
   * Alias for route(url, 'GET').
   *
   * @param  {String} url     The url of the endpoint.
   * @return {PseudoEndpoint} The resulting endpoint.
   */
  get(url) {
    return route(url, 'GET');
  }

  /**
   * Alias for route(url, 'POSt').
   *
   * @param  {String} url     The url of the endpoint.
   * @return {PseudoEndpoint} The resulting endpoint.
   */
  post(url) {
    return route(url, 'POST');
  }

  /**
   * Alias for route(url, 'PATCH').
   *
   * @param  {String} url     The url of the endpoint.
   * @return {PseudoEndpoint} The resulting endpoint.
   */
  patch(url) {
    return route(url, 'PATCH');
  }

  /**
   * Alias for route(url, 'PUT').
   *
   * @param  {String} url     The url of the endpoint.
   * @return {PseudoEndpoint} The resulting endpoint.
   */
  put(url) {
    return route(url, 'PUT');
  }

  /**
   * Alias for route(url, 'DELETE').
   *
   * @param  {String} url     The url of the endpoint.
   * @return {PseudoEndpoint} The resulting endpoint.
   */
  delete(url) {
    return route(url, 'DELETE');
  }

  /**
   * Alias for route(url, 'OPTIONS').
   *
   * @param  {String} url     The url of the endpoint.
   * @return {PseudoEndpoint} The resulting endpoint.
   */
  options(url) {
    return route(url, 'OPTIONS');
  }

  /**
   * Alias for route(url, 'HEAD').
   *
   * @param  {String} url     The url of the endpoint.
   * @return {PseudoEndpoint} The resulting endpoint.
   */
  head(url) {
    return route(url, 'HEAD');
  }
}
