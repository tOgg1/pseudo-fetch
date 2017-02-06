[![Build Status](https://travis-ci.org/tOgg1/pseudo-fetch.svg?branch=master)](https://travis-ci.org/tOgg1/pseudo-fetch)
[![Version](https://img.shields.io/badge/version-v0.2.1-blue.svg)](https://www.npmjs.com/package/pseudo-fetch)

# Pseudo Fetch
Pseudo-fetch is a lightweight mock of the Fetch API. It does not try to be compliant to any standard, but instead to have a light and easy API for you to use.

## Installation
```
npm install pseudo-fetch
```

## Quickstart

Setting up a simple mock-server which responds to requests sent with `fetch` is as easy as:

```javascript
import pseudoFetch from 'pseudo-fetch';

const server = pseudoFetch();  // Creates a server endpoint for you, and automatically overwrites window.fetch or global.fetch

server
  .get('/')
  .respond('Hello world');
  // Or .send

fetch('/')
  .then(response => response.text())
  .then(console.log);  // Will log 'Hello world'
```

You can set headers on the response from the server by calling .setHeader somewhere in your chain:

```javascript
import pseudoFetch from 'pseudo-fetch';

const server = pseudoFetch();  // Creates a server endpoint for you, and automatically overwrites window.fetch or global.fetch

server
  .get('/')
  .setHeader('Content-Type', 'plain/text')
  .send('Hello world');
  // Or .respond
  
fetch('/')
  .then(response => response.headers.get('Content-Type'))
  .then(console.log);  // Will log '['plain/text']'
  

```
