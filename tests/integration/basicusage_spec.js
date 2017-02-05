/* global describe, it, before, beforeEach, after, afterEach */
import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';

import PseudoFetch from '../../src/index.js';

describe('Basic usage integration', () => {
  it('should handle a simple get request, and give us some data back', () => {
    const server = PseudoFetch();
    server
      .get('/myroute')
      .send('Hello world');

    return expect(
      fetch('/myroute')
        .then(response => response.body)
    ).to.eventually.equal('Hello world');
  });
  it('should set a status code', () => {
    const server = PseudoFetch();
    server
      .get('/myroute')
      .status(201);

    return expect(
      fetch('/myroute')
        .then(response => response.status)
    ).to.eventually.equal(201);
  });
});