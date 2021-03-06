# Basic usage patterns
[Previous: Index](https://togg1.github.io/pseudo-fetch/)

## Creating a server

Creating a server, as illustrated in the Quickstart, is done by:
```javascript
import pseudoFetch from 'pseudo-fetch';

const server = pseudoFetch();
```

When invoking pseudoFetch, the regular window.fetch (alternativelly global.fetch in a node-environment) will be overwritten by a custom fetch, which handles all your fetch-calls from now on.

### Multiple servers

You can create multiple servers listening on different hosts, ports and protocols using the
arguments of the pseudoFetch method. There are a few different patterns:

```javascript
import pseudoFetch from 'pseudo-fetch';

const server = pseudoFetch('example.com');  // Will accept all requests to example.com
const server2 = pseudoFetch('example.com', '8080');
const server3 = pseudoFetch('example.com', '8080', 'https');  // Will accept all requests to https://example.com
const server4 = pseudoFetch({
  host: 'example.com',
  port: '8080',
  protocol: 'http'
});  // Same as server3
const server5 = pseudoFetch('example.com', '8080', 'notAProtocol');  // Will not fault, but behaviour is undefined (most likely all requests will fail)

```

If no argument is supplied to pseudoFetch, the server will accept all requests that is not prefixed with a host, i.e. is sent to the origin-server.

## Creating endpoints

After creating a server, the next step is to create an endpoint. The server object has 8
methods which all return an Endpoint:

  * get(url)
  * post(url)
  * patch(url)
  * put(url)
  * delete(url)
  * options(url)
  * head(url)
  * route(url, method)

The first 7 are aliases for route with an extra parameter. I.e.
```javascript
server.get('/') === server.route('/', 'GET')
```

### Returning data

The Endpoint class has two methods (aliases of each other) for determining what data an endpoint should return: `send` and `respond` (equivalent in every way).

```javascript
server
  .get('/')
  .send('Hello world');

fetch('/')
  .then(response => response.text())
  .then(console.log);  // Will log 'Hello world'
```

We can currently return json and raw-text. FormData, blobs and arrayBuffers are still TODO.

```javascript
server
  .get('/resource')
  .send({type: 'resource', key: 'val'});
  // or .send("{type: 'resource', key: 'val'}");

fetch('/resource')
  .then(response => response.json())
  .then(console.log); // Will log our object
```

As argument to send (respond), we can also supply a function, accepting to parameters (request and response).

```javascript
server
  .get('/')
  .send((request, response) => {
    // Do stuff
  });
```

The two arguments are Request and Response object instances, respectively. The Response object passed is the one which will be returned to the fetch-call, on completio. This object should thus be edited in place. Example:

```javascript
server
  .get('/time')
  .send((request, response) => {
    response.header.set('Content-Type', 'plain/text');
    response.body = new Date().toString();  // Return the current time
  });
```

### Setting response fields

The endpoint class has some handy methods (all of whom return the endpoint object itself) for setting some standard response fields:

  * status(code)
  * setHeader(key, value)
  * contentType() - Alias for setHeader('Content-Type', value)

Note that setting the status also automatically populates the statusMessage field of the response.

Example:

```javascript

server
  .post('/user')
  .status(201)
  .send({id: '1', type: 'user', attributes: {email: 'someEmail'}});

server
  .get('/')
  .setHeader('')
```

### Include and exclude

The endpoint class exposes two methods for accepting and rejecting requests before they are handled by a `.send` or `.respond` call: `include` and `exclude` (They are named so to avoid semantic confusion with either the accept-header, or rejection of a promise). If an include method fails, or an exclude method succeeds, the server will automatically respond with a 400 response.

If an include-handler returns false, the request will fail with a 400.
If an exclude-handler returns true, the request will fail with a 400.

```javascript
server
  .post('/user')
  .include((request, response) => {
    if (request.headers.get('Content-Type').includes('application/json')) {
      return false;
    }
    return true;
  })
  .send({id: 1, name: 'Dat John Doe'});
```

The above example will fail for all requests that has present a Content-Type header with an `applicatioe/json` header.

Equivalently, we could have written instead:

```javascript
server
  .get('/user')
  .exclude((request, response) => {
    if (!request.headers.get('Accept').includes('application/json')) {
      return true;
    }
    return false;
  })
  .send({id: 1, name: 'Dat John Doe'});

fetch('/user') // Will return a 400
fetch('/user', {headers: {'Accept': 'application/json'}});  // Will return our user with a 200 OK
```

Note the flipped boolean return values.

Includes are tested before excludes.

You can override the status code (and other properties) by manipulating the response object.

```javascript
server
  .get('/user')
  .exclude((request, response) => {
    if (request.credentials === 'omit') {
      response.status = 403;
      return true;
    }
    return false;
  });
```
This can of course also be handled in a `.send` or `.respond` function, but this way might look a bit cleaner.

## Mocking and restoring

As mentioned before, when pseudoFetch is invoked, the global fetch function is replaced with a custom one. What if you want the original back? We got you covered:

```javascript
import pseudoFetch, {mock, restore} from 'pseudoFetch';

const server = pseudoFetch(); // We have now mocked the global fetch function

// Do stuff with server, perhaps call fetch some times.
...

restore();  // By calling this, we restore the original fetch

fetch('http://example.com')  // This is now using the original fetch, and will fetch
                             // http://example.com

mock();  // And we're back in business, this will use the mock-fetch.
         // Note that we don't need to create new servers; the previously created
         // ones will work just fine.
```

[Next: Advanced usage](https://togg1.github.io/pseudo-fetch/docs/advanced-usage)
