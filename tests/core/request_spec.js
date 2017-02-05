/* global describe, it */
import {expect} from 'chai';
import Request from '../../src/core/request.js';

describe('Request', () => {
  it('should have all fields', () => {
    const request = new Request();
    expect(request.method).to.not.equal(undefined);
    expect(request.headers).to.not.equal(undefined);
    expect(request.cache).to.not.equal(undefined);
    expect(request.bodyUsed).to.not.equal(undefined);
    expect(request.context).to.not.equal(undefined);
    expect(request.mode).to.not.equal(undefined);
    expect(request.referrer).to.not.equal(undefined);
    expect(request.referrerPolicy).to.not.equal(undefined);
    expect(request.url).to.not.equal(undefined);
  });
  it('should have all Body fields ', () => {
    const request = new Request();
    expect(request.json).to.not.equal(undefined);
    expect(request.blob).to.not.equal(undefined);
    expect(request.text).to.not.equal(undefined);
    expect(request.arrayBuffer).to.not.equal(undefined);
    expect(request.formData).to.not.equal(undefined);
  });
});
