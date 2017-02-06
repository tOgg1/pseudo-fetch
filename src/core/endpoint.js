import Response from './response';
import Request from './request';
import Headers from './headers';

/**
 * This class represents an endpoint that can be called.
 * @class Endpoint
 */
export default class Endpoint {

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
    this.acceptFunctions = [];
    this.rejectFunctions = [];
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
      let request = new Request();
      let response = new Response();


      // Check for validity through accept and reject conditions
      for (let i = 0; i < this.acceptFunctions.length; i++) {
        if (typeof this.acceptFunctions[i] !== 'function' ||
            !this.acceptFunctions[i](url, config)) {
          reject(response.error());
        }
      }

      for (let i = 0; i < this.rejectFunctions.length; i++) {
        if (typeof this.rejectFunctions[i] !== 'function' ||
            !!this.rejectFunctions[i](url, config)) {
          reject(response.error());
        }
      }

      // Okey, we are good, lets run the request.
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
