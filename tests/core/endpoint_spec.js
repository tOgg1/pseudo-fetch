/* global describe, it */
import {expect} from 'chai';
import Endpoint from '../../src/core/endpoint.js';

describe('Endpoint', () => {
  it('should return this on all methods', () => {
    const endpoint = new Endpoint();
    expect(endpoint.include()).to.equal(endpoint);
    expect(endpoint.exclude()).to.equal(endpoint);
    expect(endpoint.setHeader()).to.equal(endpoint);
    expect(endpoint.respond()).to.equal(endpoint);
    expect(endpoint.send()).to.equal(endpoint);
    expect(endpoint.status()).to.equal(endpoint);
    expect(endpoint.contentType()).to.equal(endpoint);
  });
  describe('#constructor', () => {
    it('should set up the endpoint when given arguments', () => {
      const endpoint = new Endpoint('/my/endpoint', 'GET');
      expect(endpoint).to.be.ok;
      expect(endpoint.method).to.equal('GET');
      expect(endpoint.url).to.equal('/my/endpoint');
    });
    it('should set up a responseFunction when a third argument is given', () => {
      const endpoint = new Endpoint('/my/endpoint', 'GET', '<html><body>Hello</body></html>');
      expect(endpoint).to.be.ok;
      expect(endpoint.method).to.equal('GET');
      expect(endpoint.url).to.equal('/my/endpoint');
      expect(endpoint.responseFunction).to.equal('<html><body>Hello</body></html>');
    });
    it('should set default status to 200', () => {
      const endpoint = new Endpoint('/my/endpoint', 'GET');
      expect(endpoint._status).to.equal(200);
    });
    it('should set default method to GET', () => {
      const endpoint = new Endpoint('/my/endpoint');
      expect(endpoint.method).to.equal('GET');
    });
    it('should set default url to /', () => {
      const endpoint = new Endpoint();
      expect(endpoint.url).to.equal('/');
    });
    it('should go to defaults given bad arguments', () => {
      const endpoint = new Endpoint((x) => x, undefined, null);
      expect(endpoint).to.be.ok;
    });
  });
  describe('#include', () => {
    it('should add a new include function', () => {
      const endpoint = new Endpoint();
      endpoint.include((request, response) => request.url !== '/');
      expect(endpoint.includeFunctions).to.have.length(1);
    });
    it('should fail a call not passing an include function', () => {
      const endpoint = new Endpoint();
      endpoint.include((request, response) => {
        if (request.headers.get('Content-Type').includes('application/json')) {
          return false;
        }
        return true;
      });
      return expect(endpoint._call('/', {headers: {'Content-Type': 'application/json'}})
        .then((res) => res.status)
      ).to.eventually.equal(400);
    });
    it('should not fail a call passing an include function', () => {
      const endpoint = new Endpoint();
      endpoint.include((request, response) => {
        if (request.headers.get('Content-Type').includes('application/json')) {
          return true;
        }
        return false;
      });
      return expect(endpoint._call('/', {headers: {'Content-Type': 'application/json'}})
        .then((res) => res.status)
      ).to.eventually.equal(200);
    });
    it('should be able to set a custom status on a failing include function', () => {
      const endpoint = new Endpoint();
      endpoint.include((request, response) => {
        if (request.headers.get('Content-Type').includes('application/json')) {
          response.status = 409;
          return false;
        }
        return true;
      });
      return expect(endpoint._call('/', {headers: {'Content-Type': 'application/json'}})
        .then((res) => res.status)
      ).to.eventually.equal(409);
    });
  });
  describe('#exclude', () => {
    it('should add a new excludeFunction', () => {
      const endpoint = new Endpoint();
      endpoint.exclude((url, config) => url !== '/');
      expect(endpoint.excludeFunctions).to.have.length(1);
    });
    it('should fail a call not passing an exclude function', () => {
      const endpoint = new Endpoint();
      endpoint.exclude((request, response) => {
        if (request.headers.get('Content-Type').includes('application/json')) {
          return true;
        }
        return false;
      });
      return expect(endpoint._call('/', {headers: {'Content-Type': 'application/json'}})
        .then((res) => res.status)
      ).to.eventually.equal(400);
    });
    it('should not fail a call passing an exclude function', () => {
      const endpoint = new Endpoint();
      endpoint.exclude((request, response) => {
        if (request.headers.get('Content-Type').includes('application/json')) {
          return false;
        }
        return true;
      });
      return expect(endpoint._call('/', {headers: {'Content-Type': 'application/json'}})
        .then((res) => res.status)
      ).to.eventually.equal(200);
    });
    it('should be able to set a custom status on a failing include function', () => {
      const endpoint = new Endpoint();
      endpoint.exclude((request, response) => {
        if (request.headers.get('Content-Type').includes('application/json')) {
          response.status = 409;
          return true;
        }
        return false;
      });
      return expect(endpoint._call('/', {headers: {'Content-Type': 'application/json'}})
        .then((res) => res.status)
      ).to.eventually.equal(409);
    });
  });
  describe('#setHeader', () => {
    it('should add a new header', () => {
      const endpoint = new Endpoint();
      endpoint.setHeader('Content-Type', 'application/json');
      expect(endpoint.headers).to.have.length(1);
    });
  });
  describe('#respond', () => {
    it('should set a new responseFunction', () => {
      const endpoint = new Endpoint();
      endpoint.respond('lorem ipsum');
      expect(endpoint.responseFunction).to.equal('lorem ipsum');
    });
  });
  describe('#status', () => {
    it('should be properly set', () => {
      const endpoint = new Endpoint();
      endpoint.status = 209;
      expect(endpoint.status).to.equal(209);
    });
  });
  describe('#contentType', () => {
    it('should add a new Content-Type header', () => {
      const endpoint = new Endpoint();
      endpoint.contentType('application/json');
      expect(endpoint.headers.get('Content-Type')).to.deep.equal(['application/json']);
    });
  });
  describe('_call', () => {
    const endpoint = new Endpoint();
    it('should return a Promise', () => {
      expect(endpoint._call('/my/endpoint', {}).constructor).to.equal(Promise);
    });
    it('should return a Promise which resolves with a Response', () => {
      return expect(endpoint._call('/my/endpoint', {})).to.eventually.have.property('_body');
    });
    it('should fail when an acceptFunction does not pass', () => {
      endpoint.include((url, config) => url !== '/');
      return expect(endpoint._call('/')).to.eventually.reject;
    });
    it('should fail when a rejectFunction does not pass', () => {
      endpoint.exclude((url, config) => url === '/');
      return expect(endpoint._call('/')).to.eventually.reject;
    });
    it('should return a body specified as a responseFunction', () => {
      endpoint.send('Hello');
      return expect(endpoint._call('/my/endpoint', {}).then((response) => response.body)).to.eventually.equal('Hello');
    });
    it('should properly handle a responseFunction', () => {
      endpoint.send((req, res) => res.body = 'Hello2');
      return expect(endpoint._call('/my/endpoint', {}).then((response) => response.body)).to.eventually.equal('Hello2');
    });
    it('should set the correct headers', () => {
      endpoint.setHeader('Accept', 'application/json');
      return expect(endpoint._call('/my/endpoint', {})
        .then((response) => response.headers.get('Accept'))).to.eventually.deep.equal(['application/json']);
    });
    it('should set the correct status', () => {
      endpoint.status(209);
      return expect(endpoint._call('/my/endpoint', {})
        .then((response) => response.status)).to.eventually.equal(209);
    });
    it('should resolve with the correct responseFunction when specified in constructor', () => {
      const newEndpoint = new Endpoint('/', 'GET', 'Hello');
      return expect(newEndpoint._call('/', {})
        .then((response) => response.body)).to.eventually.equal('Hello');
    });
  });
});
