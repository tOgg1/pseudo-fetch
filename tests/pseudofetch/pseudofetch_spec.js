
import {expect} from 'chai';

import {
  createUrlConfigHash,
  fetch,
  mock,
  restore,
  overloadUrlconfig,
} from '../../src/pseudofetch.js';

describe('pseudofetch', () => {
  beforeEach(() => {
    restore();
  });
  describe('#createUrlConfigHash', () => {
    it('should create a urlConfigHash with all parameters', () => {
      expect(createUrlConfigHash({host: 'host', port: '1234', protocol: 'http'})).to.equal(
        'host:host|port:1234|protocol:http'
      );
    });
    it('should create a urlConfighash with one or more parameters missing', () => {
      expect(createUrlConfigHash({host: 'host', port: '1234'})).to.equal(
        'host:host|port:1234|protocol:'
      );
    });
    it('should not crash when given a bad arguments, but instead return the default hash', () => {
      expect(createUrlConfigHash(undefined)).to.equal('host:|port:|protocol:');
      expect(createUrlConfigHash(null)).to.equal('host:|port:|protocol:');
      expect(createUrlConfigHash(2)).to.equal('host:|port:|protocol:');
      expect(createUrlConfigHash('string')).to.equal('host:|port:|protocol:');
    });
  });
  describe('#overloadUrlconfig', () => {
    it('should handle arg0 being a host-string and arg1 being undefined', () => {
      expect(overloadUrlconfig('host')).to.deep.equal({
        host: 'host',
        port: '',
        protocol: '',
      });
    });
    it('should handle arg0 being a host-string and arg1 being a port', () => {
      expect(overloadUrlconfig('host', '1234')).to.deep.equal({
        host: 'host',
        port: '1234',
        protocol: '',
      });
    });
    it('should handle arg0 being a host-string, arg1 being a port and arg2 being a protocol', () => {
      expect(overloadUrlconfig('host', '1234', 'https')).to.deep.equal({
        host: 'host',
        port: '1234',
        protocol: 'https',
      });
    });
    it('should handle arg0 being an object and arg1 being undefined', () => {
      expect(overloadUrlconfig({host: 'host', port: '1234', protocol: 'http'})).to.deep.equal({
        host: 'host',
        port: '1234',
        protocol: 'http',
      });
    });
    it('should handle arg0 being an object and arg1 not being undefined', () => {
      expect(overloadUrlconfig({host: 'host', port: '1234', protocol: 'http'}, {})).to.deep.equal({
        host: 'host',
        port: '1234',
        protocol: 'http',
      });
    });
    it('should handle bad arguments, resolving to the default config', () => {
      expect(overloadUrlconfig(0)).to.deep.equal({
        host: '',
        port: '',
        protocol: '',
      });
      expect(overloadUrlconfig((x) => x)).to.deep.equal({
        host: '',
        port: '',
        protocol: '',
      });
      expect(overloadUrlconfig()).to.deep.equal({
        host: '',
        port: '',
        protocol: '',
      });
      expect(overloadUrlconfig(null)).to.deep.equal({
        host: '',
        port: '',
        protocol: '',
      });
      expect(overloadUrlconfig([])).to.deep.equal({
        host: '',
        port: '',
        protocol: '',
      });
    });
  });
  describe('#fetch', () => {
    it('should fail when no server is registered', () => {
      expect(fetch).to.throw();
    });
  });
  describe('#mock', () => {
    it('should replace the global fetch', () => {
      expect(global.fetch).to.not.equal(fetch);
      mock();
      expect(global.fetch).to.equal(fetch);
    });
  });
  describe('#restore', () => {
    it('should return fetch to its original state', () => {
      let current = global.fetch;
      expect(current).to.not.equal(fetch);
      mock();
      expect(global.fetch).to.equal(fetch);
      restore();
      expect(global.fetch).to.equal(current);
    });
  });
});
