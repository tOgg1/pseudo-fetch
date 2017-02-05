/* global describe, it */
import {expect} from 'chai';

import pseudoFetch from '../../src/index.js';

describe('Basic usage integration', () => {
  it('should handle a simple get request, and give us some data back', () => {
    const server = pseudoFetch();
    server
      .get('/myroute')
      .send('Hello world');

    return expect(
      fetch('/myroute')
        .then((response) => response.body)
    ).to.eventually.equal('Hello world');
  });
  it('should set a status code', () => {
    const server = pseudoFetch();
    server
      .get('/myroute')
      .status(201);

    return expect(
      fetch('/myroute')
        .then((response) => response.status)
    ).to.eventually.equal(201);
  });
  it('should handle only correct methods', () => {
    const server = pseudoFetch();
    server
      .post('/myroute')
      .send('test');

    return Promise.all([
      expect(
        fetch('/myroute', {method: 'POST'})
          .then((response) => response.status)
      ).to.eventually.equal(200),
      expect(
        fetch('/myroute', {method: 'GET'})
          .then((response) => response.status)
      ).to.eventually.equal(404),
    ]);
  });
  it('should be able to serve json objects', () => {
    const server = pseudoFetch();
    server
      .get('/myroute')
      .send({a: 2});

    expect(
      fetch('/myroute')
        .then((response) => response.json())
    ).to.eventually.deep.equal({a: 2});
  });
  it('should be able to serve json as strings', () => {
    const server = pseudoFetch();
    server
      .get('/myroute')
      .send('{"a": 2}');

    expect(
      fetch('/myroute')
        .then((response) => response.json())
    ).to.eventually.deep.equal({a: 2});
  });
});
