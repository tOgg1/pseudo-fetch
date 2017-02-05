import Headers from './headers';

/**
 * This class represents a mock of a window Response.
 * We have this class to be able to have a mutable version of a response.
 *
 * Some, but not all of a window.Response's functionalities are implemented. In particular,
 * all properties are implemented, and all mutating methods are implemented. None of the
 * Body-inherited methods are implemented, but is readily available after toWindowResponse is called.
 */
class Response {

  /**
   * Constructor of the pseudoresponse.
   *
   * @param {Object} config
   */
  constructor(config = {}) {
    this._body = config.body;
    this._url = config.url;
    this._status = config.status;
    this._headers = config.headers || new Headers();
    this._ok = config.status >= 200 && config.status < 300;
  }

  /**
   * Returns the body.
   *
   * @return {string|Object|Blob|FormData} Returns the body.
   */
  get body() {
    return this._body;
  }

  /**
   * Sets the body.
   *
   * @param  {string|Object|Blob|FormData} body The body
   */
  set body(body) {
    this._body = body;
  }

  /**
   * Returns ok.
   *
   * @return {boolean}
   */
  get ok() {
    return this._ok;
  }

  /**
   * Ok can not be set, so this method throws an Error.
   *
   * @param  {Number} ok
   */
  set ok(ok) {
    throw new Error(`ok is a read-only field, dependent on status. If you want ok to be true,
                     set status in the range 200-299`);
  }

  /**
   * Returns the status.
   *
   * @return {Number} The status
   */
  get status() {
    return this._status;
  }

  /**
   * Sets the status of this response.
   * Also sets the ok-flag according to whether the status is in the range
   * 200-299.
   *
   * @param  {Number} status [description]
   */
  set status(status) {
    if (typeof status !== 'number') {
      throw new Error(`Invalid argument given to set status. Expected number, got ${typeof status}`);
    }
    this._status = status;
    this._ok = status >= 200 && status < 300;
  }

  /**
   * Gets the statusMessage.
   *
   * @return {String} The status message.
   */
  get statusMessage() {
    return this._statusMessage;
  }

  /**
   * Tries to set the status message. Will always throw an error.
   * @param {String} message Argument, which will be ignored.
   */
  set statusMessage(message) {
    throw new Error('Unable to set status-message directly');
  }

  /**
   * Gets the headers of this response.
   *
   * @return {Headers} The headers of this response.
   */
  get headers() {
    return this._headers;
  }

  /**
   * Sets the headers of this response.
   * If you want to set individual headers instead of the entire headers, object, you
   * should instead call get headers, and then edit the result in-place.
   *
   * @param  {Headers} headers The headers
   */
  set headers(headers) {
    this._headers = headers;
  }

  /**
   * Sets the type.
   *
   * @param  {String} type The type to set. Typically 'basic', 'cors', 'error' or 'opaque'
   */
  set type(type) {
    this._type = type;
  }

  /**
   * Returns the type.
   * @return {String} The type
   */
  get type() {
    return this._type;
  }

  /**
   * Sets the url.
   *
   * @param  {String} url A string-parameter representing the url.
   */
  set url(url) {
    this._url = url;
  }

  /**
   * Gets the url.
   *
   * @return {String} The url.
   */
  get url() {
    return this._url;
  }

  /**
   * Sets the finalUrl.
   *
   * @param  {Boolean} useFinalUrl A boolean.
   */
  set useFinalUrl(useFinalUrl) {
    this._useFinalUrl = useFinalUrl;
  }

  /**
   * Gets the finalUrl.
   *
   * @return {Boolean} Final url
   */
  get useFinalUrl() {
    return this._useFinalUrl;
  }

  /**
   * Clones the PseudoResponse and creates a new clone of the object. Identical in every
   * way, but stored in a different variable.
   *
   * @return {PseudoResponse}
   */
  clone() {
    return new PseudoResponse({
      body: this.body,
      url: this.url,
      status: this.status,
      headers: this.headers,
    });
  }

  /**
   * Creates a new Response that is a redirect to the specified url.
   *
   * @param {String} url The url to redirect to
   * @param {Number} status The status
   * @return {Response} A new Response object,
   */
  redirect(url, status) {
    return new PseudoResponse({
      body: this.body,
      url: url,
      status: status,
      headers: this.headers,
    });
  }

  /**
   * Throws an error from the response.
   */
  error() {
    throw new Error(`Connection refused: ${this.url}`);
  }

  /**
   * Returns an arrayBuffer representation of the body, if possible.
   *
   * Currently not implemented.
   */
  arrayBuffer() {
    throw new Error('arrayBuffer not implemented');
  }

  /**
   * Returns a blob-representation of the body, if possible.
   *
   * Currently not implemented.
   */
  blob() {
    throw new Error('arrayBuffer not implemented');
  }

  /**
   * Returns a formData-representation of the body, if possible.
   *
   * Currently not implemented.
   */
  formData() {
    throw new Error('formData not implemented');
  }

  /**
   * Returns a json-representation of the body, wrapped in a Promise, if possible.
   * @return {Promise} A promise which resolves with a json representation of the body.
   */
  json() {
    return new Promise((resolve, reject) => {
      try {
        let parsed = JSON.parse(this.body || '');
        resolve(parsed);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Returns a text-representation of the body, wrapped in a Promise, if possible.
   * @return {Promise}  A promise which resolves with a text-representation of the body.
   */
  text() {
    return new Promise((resolve, reject) => {
      try {
        resolve((this.body || '').toString());
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default Response;
