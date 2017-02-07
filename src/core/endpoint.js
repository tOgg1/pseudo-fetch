import Response from './response';
import Request from './request';
import Headers from './headers';

/**
 * This class represents an endpoint that can be called.
 * @class Endpoint
 */
class Endpoint {

  /**
   * Constructs a Endpoint instance.
   *
   * @param  {string} url                       Url of the endpoint
   * @param  {string} method                    Method to listen for, typically GET, POST, PATCH, OPTIONS etc.
   * @param  {Function|Any} responseFunction   Responsefunction. Optional argument.
   */
  constructor(url, method, responseFunction) {
    this.url = url || '/';
    this.method = method || 'GET';
    this.includeFunctions = [];
    this.excludeFunctions = [];
    this._status = 200;
    this.headers = new Headers();
    this.responseFunction = responseFunction || ((req, res) => 'Hello world');
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
  include(condition) {
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
  exclude(condition) {
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
  setHeader(key, value) {
    this.headers.append(key, value);
    return this;
  }

  /**
   * Defines the response to give when this endpoint is (succesfully) called.
   *
   * @param  {Function}       responseFunction The response function of the endpoint
   * @return {Endpoint}                  this
   */
  respond(responseFunction) {
    this.responseFunction = responseFunction;
    return this;
  }

  /**
   * Alias for respond.
   *
   * @param  {Function}       responseFunction The response function of the endpoint
   * @return {Endpoint}                  this
   */
  send(responseFunction) {
    return this.respond(responseFunction);
  }

  /**
   * Sets the status of this endpoint.
   *
   * @param {int} status The status of this endpoint.
   * @return {Endpoint}                  this
   */
  status(status) {
    this._status = status;
    return this;
  }

  /**
   * Shortcut for setting the contentType header.
   *
   * @param  {String}   type  The contentType value.
   * @return {Endpoint}       this
   */
  contentType(type) {
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
  _call(url, config) {
    return new Promise((resolve, reject) => {
      let request = new Request(url, config);
      let response = new Response();

      // Set it temporarily to 400, in case we return from an inclusion/exclusion
      // We do this so the user can override the 400 status if he/she wants to.
      response.status = 400;

      // Check for validity through include- and reject-conditions
      for (let i = 0; i < this.includeFunctions.length; i++) {
        if (typeof this.includeFunctions[i] === 'function') {
          const includeFunctionResult = this.includeFunctions[i](request, response);
          if (!includeFunctionResult) {
            return resolve(response);
          }
        }
      }

      for (let i = 0; i < this.excludeFunctions.length; i++) {
        if (typeof this.excludeFunctions[i] === 'function') {
          const excludeFunctionResult = this.excludeFunctions[i](request, response);
          if (!!excludeFunctionResult) {
            return resolve(response);
          }
        }
      }

      // Okey nothing failed, set status back
      response.status = 200;

      response.status = this._status;
      response.headers = this.headers;
      this._callResponseFunction(request, response);
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
  _callResponseFunction(request, response) {
    if (typeof this.responseFunction === 'function') {
      this.responseFunction(request, response);
    } else {
      response.body = this.responseFunction;
    }
  }
}

export default Endpoint;
