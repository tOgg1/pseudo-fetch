[![Build Status](https://travis-ci.org/tOgg1/pseudo-fetch.svg?branch=master)](https://travis-ci.org/tOgg1/pseudo-fetch)
[![Version](https://img.shields.io/badge/version-v0.3.0-blue.svg)](https://www.npmjs.com/package/pseudo-fetch)

# Pseudo Fetch

[Docs](https://togg1.github.io/pseudo-fetch/)

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


Accepting other methods than GET:

```javascript
server
  .post('/myroute')
  .send('Hello');

// Alternatively
// server
//   .route('/myroute', 'POST')
//   .send('Hello');

fetch('/myroute')
  .then(response => response.status)
  .then(console.log);  // Will print 404

fetch('/myroute', {method: "POST"})
  .then(response => response.status)
  .then(console.log);  // Will print 200


```

Sending JSON-data:
```javascript
server
  .get('/my/json/endpoint')
  .send({message: 'Hello world', key: 'value'});

fetch('/my/json/endpoint')
  .then(response => response.json())
  .then(console.log); // Will print
                      // {
                      //   message: 'Hello world',
                      //   key: 'value'
                      // }
```

Setting return status:

```javascript
server
  .post('/human')
  .status(201)
  .send({name: 'New Human', id: '1'});

fetch('/human', {method: 'POST'})
  .then(response => response.status)
  .then(console.log)  // Will log 201
```

Settings headers:

```javascript
server
  .get('/')
  .setHeader('Content-Type', 'plain/text')
  .send('Hello world');
  // Or .respond

fetch('/')
  .then(response => response.headers.get('Content-Type'))
  .then(console.log);  // Will log '['plain/text']'
```

If you want to handle request/response data more thoroughly, you can supply a
function accepting two arguments to .send or .respond.

```javascript
server
  .post('/human')
  .send((request, response) => {
    let humanData = request.json();
    humanData.id = '1';

    response.body = humanData;  // Lets return it back
    response.headers.set('Content-Type', 'application/json');
  });

fetch('/human', {
    method: 'POST',
    body: JSON.stringify({name: ''}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(humanData => {
    console.log(humanData);  // Should print our humanData with the new id
    // Now we can do stuff with our newly created human
  });

```

[Next: Basic usage](https://togg1.github.io/pseudo-fetch/docs/basic-usage)
