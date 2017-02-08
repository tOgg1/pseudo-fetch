/* global describe, it, before */
import {expect} from 'chai';
import Server, {createEndpointHash} from '../../src/core/server.js';
import Endpoint from '../../src/core/endpoint.js';

describe('Server', () => {
  describe('#route', () => {
    it('should return an Endpoint with correct defaults', () => {
      const server = new Server();
      const endpoint = server.route();
      expect(endpoint.constructor).to.equal(Endpoint);
      expect(endpoint.url).to.equal('/');
      expect(endpoint.method).to.equal('GET');
    });
    it('should add a new endpoint to the list of endpoints', () => {
      const server = new Server();
      server.route();
      expect(Object.keys(server.endpoints)).to.have.length(1);
    });
    it('should add an endpoint with the correct information', () => {
      const server = new Server();
      const endpoint = server.route('url', 'GET');
      expect(server.endpoints[createEndpointHash('url', 'GET')]).to.equal(endpoint);
    });
  });
  describe('#get', () => {
    it('should return an Endpoint with correct defaults', () => {
      const server = new Server();
      const endpoint = server.route();
      expect(endpoint.constructor).to.equal(Endpoint);
      expect(endpoint.url).to.equal('/');
      expect(endpoint.method).to.equal('GET');
    });
    it('should add a new endpoint to the list of endpoints', () => {
      const server = new Server();
      server.route();
      expect(Object.keys(server.endpoints)).to.have.length(1);
    });
  });
  describe('#post', () => {
    it('should return an Endpoint with correct defaults', () => {
      const server = new Server();
      const endpoint = server.post();
      expect(endpoint.constructor).to.equal(Endpoint);
      expect(endpoint.url).to.equal('/');
      expect(endpoint.method).to.equal('POST');
    });
    it('should add a new endpoint to the list of endpoints', () => {
      const server = new Server();
      server.post();
      expect(Object.keys(server.endpoints)).to.have.length(1);
    });
    it('should add an endpoint with the correct information', () => {
      const server = new Server();
      const endpoint = server.post('url', 'POST');
      expect(server.endpoints[createEndpointHash('url', 'POST')]).to.equal(endpoint);
    });
  });
  describe('#patch', () => {
    it('should return an Endpoint with correct defaults', () => {
      const server = new Server();
      const endpoint = server.patch();
      expect(endpoint.constructor).to.equal(Endpoint);
      expect(endpoint.url).to.equal('/');
      expect(endpoint.method).to.equal('PATCH');
    });
    it('should add a new endpoint to the list of endpoints', () => {
      const server = new Server();
      server.patch();
      expect(Object.keys(server.endpoints)).to.have.length(1);
    });
    it('should add an endpoint with the correct information', () => {
      const server = new Server();
      const endpoint = server.patch('url', 'PATCH');
      expect(server.endpoints[createEndpointHash('url', 'PATCH')]).to.equal(endpoint);
    });
  });
  describe('#put', () => {
    it('should return an Endpoint with correct defaults', () => {
      const server = new Server();
      const endpoint = server.put();
      expect(endpoint.constructor).to.equal(Endpoint);
      expect(endpoint.url).to.equal('/');
      expect(endpoint.method).to.equal('PUT');
    });
    it('should add a new endpoint to the list of endpoints', () => {
      const server = new Server();
      server.put();
      expect(Object.keys(server.endpoints)).to.have.length(1);
    });
    it('should add an endpoint with the correct information', () => {
      const server = new Server();
      const endpoint = server.put('url', 'PUT');
      expect(server.endpoints[createEndpointHash('url', 'PUT')]).to.equal(endpoint);
    });
  });
  describe('#delete', () => {
    it('should return an Endpoint with correct defaults', () => {
      const server = new Server();
      const endpoint = server.delete();
      expect(endpoint.constructor).to.equal(Endpoint);
      expect(endpoint.url).to.equal('/');
      expect(endpoint.method).to.equal('DELETE');
    });
    it('should add a new endpoint to the list of endpoints', () => {
      const server = new Server();
      server.delete();
      expect(Object.keys(server.endpoints)).to.have.length(1);
    });
    it('should add an endpoint with the correct information', () => {
      const server = new Server();
      const endpoint = server.delete('url', 'DELETE');
      expect(server.endpoints[createEndpointHash('url', 'DELETE')]).to.equal(endpoint);
    });
  });
  describe('#options', () => {
    it('should return an Endpoint with correct defaults', () => {
      const server = new Server();
      const endpoint = server.options();
      expect(endpoint.constructor).to.equal(Endpoint);
      expect(endpoint.url).to.equal('/');
      expect(endpoint.method).to.equal('OPTIONS');
    });
    it('should add a new endpoint to the list of endpoints', () => {
      const server = new Server();
      server.options();
      expect(Object.keys(server.endpoints)).to.have.length(1);
    });
    it('should add an endpoint with the correct information', () => {
      const server = new Server();
      const endpoint = server.options('url', 'OPTIONS');
      expect(server.endpoints[createEndpointHash('url', 'OPTIONS')]).to.equal(endpoint);
    });
  });
  describe('#head', () => {
    it('should return an Endpoint with correct defaults', () => {
      const server = new Server();
      const endpoint = server.head();
      expect(endpoint.constructor).to.equal(Endpoint);
      expect(endpoint.url).to.equal('/');
      expect(endpoint.method).to.equal('HEAD');
    });
    it('should add a new endpoint to the list of endpoints', () => {
      const server = new Server();
      server.head();
      expect(Object.keys(server.endpoints)).to.have.length(1);
    });
    it('should add an endpoint with the correct information', () => {
      const server = new Server();
      const endpoint = server.head('url', 'HEAD');
      expect(server.endpoints[createEndpointHash('url', 'HEAD')]).to.equal(endpoint);
    });
  });
  describe('#_call', () => {
    it('should return a promise', () => {
      const server = new Server();
      server.route();
      expect(server._call().constructor).to.equal(Promise);
    });
    it('should resolve with a 404 when no endpoint exists for an url', () => {
      const server = new Server();
      return expect(server._call().then((response) => response.status)).to.eventually.equal(404);
    });
    it('should resolve with a 200 when a default endpoint exists for an url', () => {
      const server = new Server();
      server.route('url', 'method');
      return expect(server._call('url', {method: 'method'})
        .then((response) => response.status)
      ).to.eventually.equal(200);
    });
  });
});
