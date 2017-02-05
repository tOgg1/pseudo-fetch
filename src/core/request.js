import Headers from './headers';

/**
 * This class represents a request object.
 */
 class Request {

  /**
   * Construct a new Request.
   *
   * @param  {String} url  The url that the request should go to.
   * @param  {Object} init An init object taking all regular configurations of a fetch-request.
   */
  constructor(url, init = {}) {
    this._url = url || '';
    this._method = init.method || 'GET';
    this._headers = init.headers || new Headers();
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
  get method() {
    return this._method;
  }

  /**
   * The headers of the Request.
   * @return {Headers} The headers.
   */
  get headers() {
    return this._headers;
  }

  /**
   * The cache policy of the Request.
   * @return {String} The cache policy.
   */
  get cache() {
    return this._cache;
  }
  /**
   * Returns whether or not the body has been read yet.
   * @return {Boolean} True or false
   */
  get bodyUsed() {
    return this._bodyUsed;
  }

  /**
   * Context is not supported, and will always return the empty string.
   * @return {String} ''
   */
  get context() {
    return '';
  }

  /**
   * The mode of the Request.
   * @return {String} The mode.
   */
  get mode() {
    return this._mode;
  }

  /**
   * The cache policy of the Request.
   * @return {String} The referrer.
   */
  get referrer() {
    return this._referrer;
  }

  /**
   * The referrerPolicy of the Request. Note that this is the Http Referrer header.
   * @return {String} The referrerPolicy value:
   */
  get referrerPolicy() {
    return this.headers.get('Referrer') || '';
  }

  /**
   * The url of the Request.
   * @return {String} The url.
   */
  get url() {
    return this._url;
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

export default Request;
