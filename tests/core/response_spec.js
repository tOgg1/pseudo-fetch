/* global describe, it */
import {expect} from 'chai';
import Response from '../../src/core/response.js';

describe('Response', () => {
  it('should have all fields', () => {
    const response = new Response();
    expect(response.body).to.not.equal(undefined);
    expect(response.ok).to.not.equal(undefined);
    expect(response.status).to.not.equal(undefined);
    expect(response.statusMessage).to.not.equal(undefined);
    expect(response.headers).to.not.equal(undefined);
    expect(response.type).to.not.equal(undefined);
    expect(response.url).to.not.equal(undefined);
    expect(response.useFinalUrl).to.not.equal(undefined);
  });
  it('should have all body fields ', () => {
    const response = new Response();
    expect(response.json).to.not.equal(undefined);
    expect(response.blob).to.not.equal(undefined);
    expect(response.text).to.not.equal(undefined);
    expect(response.arrayBuffer).to.not.equal(undefined);
    expect(response.formData).to.not.equal(undefined);
  });
  it('should set statusMessage when status is set', () => {
      const response = new Response();
      response.status = 201;
      expect(response.statusMessage).to.equal('Created');
  });
  it('should parse json when its an object', () => {
      const response = new Response();
      response.body = {a: 'b'};
      return expect(response.json()).to.eventually.deep.equal({a: 'b'});
  });
  it('should parse json when its a string', () => {
      const response = new Response();
      response.body = '{"a": "b"}';
      return expect(response.json()).to.eventually.deep.equal({a: 'b'});
  });
  it('should parse text', () => {
      const response = new Response();
      response.body = '{a: "b"}';
      return expect(response.text()).to.eventually.deep.equal('{a: "b"}');
  });
});
