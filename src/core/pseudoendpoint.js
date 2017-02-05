import PseudoResponse from './pseudoresponse';
import PseudoRequest from './pseudorequest';

/**
 * This class represents an endpoint that can be called.
 * @class  PseudoEndpoint
 */
export default class PseudoEndpoint {

  /**
   * Constructs a PseudoEndpoint instance.
   *
   * @param  {string} url    Url of the endpoint
   * @param  {string} method Method to listen for, typically GET, POST, PATCH, OPTIONS etc.
   */
  constructor(url, method) {
    this.url = url;
    this.method = method;
    this.acceptFunctions = [];
    this.rejectFunctions = [];
    this.status = 200;
    this.responseHeaders = new Headers();
    this.responseFunction = (req, res) => 'Hello world';
  }

  /**
   * Adds an accept-function to the endpoint. When called, the endpoint will
   * go through all accept-functions to check for truthness. If either does not return a truthy value,
   * the call will fail with a 400 Bad Request.
   *
   * @param  {Function}        condition The conditional function to check for
   *                                     The function should accept two parameters: url and config
   * @return {PseudoEndpoint}            This
   */
  include(condition) {
    this.acceptFunctions.push(condition);
    return this;
  }

  /**
   * Adds an reject-function to the endpoint. When called, the endpoint will go through
   * all reject-functions (after the accept-functions) to check for falseness. If either does return a truthy value,
   * the call will fail with a 400 Bad Request.
   *
   * @param  {Function}       condition The conditiaonl function to check for
   * @return {PseudoEndpoint}           This
   */
  exclude(condition) {
    this.rejectFunctions.push(condition);
    return this;
  }


  /**
   * Sets a key-value pair of headers on this endpoint. This header will be sent back with any
   * response from this endpoint.
   *
   * @param {string}          key      Header key
   * @param {string}          value    Header value
   * @return {PseudoEndpoint}          this
   */
  setHeader(key, value) {
    this.responseHeaders.append(key, value);
    return this;
  }

  /**
   * Defines the response to give when this endpoint is (succesfully) called.
   *
   * @param  {Function}       responseFunction The response function of the endpoint
   * @return {PseudoEndpoint}                  this
   */
  respond(responseFunction) {
    this.responseFunction = responseFunction;
    return this;
  }

  /**
   * Alias for respond.
   *
   * @param  {Function}       responseFunction The response function of the endpoint
   * @return {PseudoEndpoint}                  this
   */
  send(responseFunction) {
    return respond(responseFunction);
  }

  /**
   * Returns the status of this endpoint.
   *
   * @return {Number} Status code
   */
  get status() {
    return this.status;
  }

  /**
   * Sets the status to return.
   * @param  {Number} status A status
   * @return {[type]}        [description]
   */
  set status(status) {
    this.status = status;
    return this;
  }

  /**
   * Shortcut for setting the contentType header.
   *
   * @param  {[type]} type [description]
   * @return {[type]}      [description]
   */
  contentType(type) {
    this.setHeader('Content-Type', type);
    return type;
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
  _call(url, config) {
    let request = new PseudoRequest();
    let response = new PseudoResponse();

    // Check for validity through accept and reject conditions
    for (let i = 0; i < this.acceptFunctions.length; i++) {
      if (typeof this.acceptFunctions !== 'function' ||
          !this.acceptFunctions(url, config)) {
        return response.toWindowResponse().error();
      }
    }

    for (let i = 0; i < this.rejectFunctions.length; i++) {
      if (typeof this.rejectFunctions !== 'function' ||
          !!this.rejectFunctions(url, config)) {
        return response.toWindowResponse().error();
      }
    }

    // Okey, we are good, lets run the request.
    response.status = this.status;
    _callResponseFunction(request, response);
  }

  /**
   * Overloads the Response function. If this.responseFunction is a function,
   * it will be called. If it is anything else, it will be interpreted as the body
   * to return.
   *
   * @param  {PseudoRequest}  request  The request object of the call
   * @param  {PseudoResponse} response The response object of the call.
   */
  _callResponseFunction(request, response) {
    if (typeof this.responseFunction === 'function') {
      this.responseFunction(request, response);
    } else {
      response.body = this.responseFunction;
    }
  }
}
