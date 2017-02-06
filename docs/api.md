## Classes

<dl>
<dt><a href="#Endpoint">Endpoint</a></dt>
<dd></dd>
<dt><a href="#Request">Request</a></dt>
<dd><p>This class represents a request object.</p>
</dd>
<dt><a href="#Response">Response</a></dt>
<dd><p>This class represents a mock of a window Response.
We have this class to be able to have a mutable version of a response.</p>
<p>Some, but not all of a window.Response&#39;s functionalities are implemented. In particular,
all properties are implemented, and all mutating methods are implemented. None of the
Body-inherited methods are implemented, but is readily available after toWindowResponse is called.</p>
</dd>
<dt><a href="#PseudoServer">PseudoServer</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#length">length</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the amount of headers present in this Headers-Object.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#include">include(condition)</a> ⇒ <code><a href="#Endpoint">Endpoint</a></code></dt>
<dd><p>Adds an accept-function to the endpoint. When called, the endpoint will
go through all accept-functions to check for truthness. If either does not return a truthy value,
the call will fail with a 400 Bad Request.</p>
</dd>
<dt><a href="#exclude">exclude(condition)</a> ⇒ <code><a href="#Endpoint">Endpoint</a></code></dt>
<dd><p>Adds an reject-function to the endpoint. When called, the endpoint will go through
all reject-functions (after the accept-functions) to check for falseness. If either does return a truthy value,
the call will fail with a 400 Bad Request.</p>
</dd>
<dt><a href="#setHeader">setHeader(key, value)</a> ⇒ <code><a href="#Endpoint">Endpoint</a></code></dt>
<dd><p>Sets a key-value pair of headers on this endpoint. This header will be sent back with any
response from this endpoint.</p>
</dd>
<dt><a href="#respond">respond(responseFunction)</a> ⇒ <code><a href="#Endpoint">Endpoint</a></code></dt>
<dd><p>Defines the response to give when this endpoint is (succesfully) called.</p>
</dd>
<dt><a href="#send">send(responseFunction)</a> ⇒ <code><a href="#Endpoint">Endpoint</a></code></dt>
<dd><p>Alias for respond.</p>
</dd>
<dt><a href="#status">status(status)</a> ⇒ <code><a href="#Endpoint">Endpoint</a></code></dt>
<dd><p>Sets the status of this endpoint.</p>
</dd>
<dt><a href="#contentType">contentType(type)</a> ⇒ <code><a href="#Endpoint">Endpoint</a></code></dt>
<dd><p>Shortcut for setting the contentType header.</p>
</dd>
<dt><a href="#_call">_call(url, config)</a> ⇒ <code><a href="#Response">Response</a></code></dt>
<dd><p>This method should be called when the endpoint is being requested.</p>
<p>The method will perform all actions necessary to make the endpoint behave as expected
on the basis of its configuration.</p>
</dd>
<dt><a href="#_callResponseFunction">_callResponseFunction(request, response)</a></dt>
<dd><p>Overloads the Response function. If this.responseFunction is a function,
it will be called. If it is anything else, it will be interpreted as the body
to return.</p>
</dd>
<dt><a href="#append">append(key, value)</a></dt>
<dd><p>Appends a key to the Headers. If the key already exists, the value
will be appended to the list of values. This distinguishes it from the
set function, which will simply override all values of the specific key.</p>
</dd>
<dt><a href="#delete">delete(key)</a></dt>
<dd><p>Deletes the header defined by the key-argument.</p>
</dd>
<dt><a href="#entries">entries()</a> ⇒ <code>Iterator</code></dt>
<dd><p>Returns an Iterator over all the entries of the Headers-object..</p>
</dd>
<dt><a href="#get">get(key)</a> ⇒ <code>Array</code></dt>
<dd><p>Gets the header-value specified by a header key.</p>
</dd>
<dt><a href="#getAll">getAll()</a> ⇒ <code>Array</code></dt>
<dd><p>Alias for get.</p>
</dd>
<dt><a href="#has">has(key)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Returns true if this Headers-object has a header as inidicated
by the key-argument.</p>
</dd>
<dt><a href="#keys">keys()</a> ⇒ <code>Iterator</code></dt>
<dd><p>Returns and iterator over all the keys present in this Headers-object.</p>
</dd>
<dt><a href="#set">set(key, value)</a></dt>
<dd><p>Sets a header-key/value pair. Will overwrite all existing values of the specified key.</p>
</dd>
<dt><a href="#values">values()</a> ⇒ <code>Iterator</code></dt>
<dd><p>Returns an iterator over all the values present in this Headers-object.</p>
</dd>
<dt><a href="#createEndpointHash">createEndpointHash(url, method)</a> ⇒ <code>String</code></dt>
<dd><p>Creates an endpoint hash.
The hash is a combination of the url and the method parameters. Guarantees uniqueness
for distinct inputs.</p>
</dd>
<dt><a href="#route">route(url, method)</a> ⇒ <code><a href="#Endpoint">Endpoint</a></code></dt>
<dd><p>Registers a new route with the server. The method simply creates a new
Endpoint-instance, and adds it to the endpoints-dict of this server.</p>
</dd>
<dt><a href="#get">get(url)</a> ⇒ <code><a href="#Endpoint">Endpoint</a></code></dt>
<dd><p>Alias for route(url, &#39;GET&#39;).</p>
</dd>
<dt><a href="#post">post(url)</a> ⇒ <code><a href="#Endpoint">Endpoint</a></code></dt>
<dd><p>Alias for route(url, &#39;POSt&#39;).</p>
</dd>
<dt><a href="#patch">patch(url)</a> ⇒ <code><a href="#Endpoint">Endpoint</a></code></dt>
<dd><p>Alias for route(url, &#39;PATCH&#39;).</p>
</dd>
<dt><a href="#put">put(url)</a> ⇒ <code><a href="#Endpoint">Endpoint</a></code></dt>
<dd><p>Alias for route(url, &#39;PUT&#39;).</p>
</dd>
<dt><a href="#delete">delete(url)</a> ⇒ <code><a href="#Endpoint">Endpoint</a></code></dt>
<dd><p>Alias for route(url, &#39;DELETE&#39;).</p>
</dd>
<dt><a href="#options">options(url)</a> ⇒ <code><a href="#Endpoint">Endpoint</a></code></dt>
<dd><p>Alias for route(url, &#39;OPTIONS&#39;).</p>
</dd>
<dt><a href="#head">head(url)</a> ⇒ <code><a href="#Endpoint">Endpoint</a></code></dt>
<dd><p>Alias for route(url, &#39;HEAD&#39;).</p>
</dd>
<dt><a href="#_call">_call(url, config)</a> ⇒ <code>Promise</code></dt>
<dd><p>Calls this server.</p>
</dd>
</dl>

<a name="Endpoint"></a>

## Endpoint
**Kind**: global class  
<a name="new_Endpoint_new"></a>

### new Endpoint()
This class represents an endpoint that can be called.

<a name="Request"></a>

## Request
This class represents a request object.

**Kind**: global class  

* [Request](#Request)
    * [new Request(url, init)](#new_Request_new)
    * [.method](#Request+method) ⇒ <code>String</code>
    * [.headers](#Request+headers) ⇒ <code>Headers</code>
    * [.cache](#Request+cache) ⇒ <code>String</code>
    * [.bodyUsed](#Request+bodyUsed) ⇒ <code>Boolean</code>
    * [.context](#Request+context) ⇒ <code>String</code>
    * [.mode](#Request+mode) ⇒ <code>String</code>
    * [.referrer](#Request+referrer) ⇒ <code>String</code>
    * [.referrerPolicy](#Request+referrerPolicy) ⇒ <code>String</code>
    * [.url](#Request+url) ⇒ <code>String</code>
    * [.arrayBuffer()](#Request+arrayBuffer)
    * [.blob()](#Request+blob)
    * [.formData()](#Request+formData)
    * [.json()](#Request+json) ⇒ <code>Promise</code>
    * [.text()](#Request+text) ⇒ <code>Promise</code>

<a name="new_Request_new"></a>

### new Request(url, init)
Construct a new Request.


| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The url that the request should go to. |
| init | <code>Object</code> | An init object taking all regular configurations of a fetch-request. |

<a name="Request+method"></a>

### request.method ⇒ <code>String</code>
The method of the Request.

**Kind**: instance property of <code>[Request](#Request)</code>  
**Returns**: <code>String</code> - Typically something like GET, POST, etc.  
<a name="Request+headers"></a>

### request.headers ⇒ <code>Headers</code>
The headers of the Request.

**Kind**: instance property of <code>[Request](#Request)</code>  
**Returns**: <code>Headers</code> - The headers.  
<a name="Request+cache"></a>

### request.cache ⇒ <code>String</code>
The cache policy of the Request.

**Kind**: instance property of <code>[Request](#Request)</code>  
**Returns**: <code>String</code> - The cache policy.  
<a name="Request+bodyUsed"></a>

### request.bodyUsed ⇒ <code>Boolean</code>
Returns whether or not the body has been read yet.

**Kind**: instance property of <code>[Request](#Request)</code>  
**Returns**: <code>Boolean</code> - True or false  
<a name="Request+context"></a>

### request.context ⇒ <code>String</code>
Context is not supported, and will always return the empty string.

**Kind**: instance property of <code>[Request](#Request)</code>  
**Returns**: <code>String</code> - ''  
<a name="Request+mode"></a>

### request.mode ⇒ <code>String</code>
The mode of the Request.

**Kind**: instance property of <code>[Request](#Request)</code>  
**Returns**: <code>String</code> - The mode.  
<a name="Request+referrer"></a>

### request.referrer ⇒ <code>String</code>
The cache policy of the Request.

**Kind**: instance property of <code>[Request](#Request)</code>  
**Returns**: <code>String</code> - The referrer.  
<a name="Request+referrerPolicy"></a>

### request.referrerPolicy ⇒ <code>String</code>
The referrerPolicy of the Request. Note that this is the Http Referrer header.

**Kind**: instance property of <code>[Request](#Request)</code>  
**Returns**: <code>String</code> - The referrerPolicy value:  
<a name="Request+url"></a>

### request.url ⇒ <code>String</code>
The url of the Request.

**Kind**: instance property of <code>[Request](#Request)</code>  
**Returns**: <code>String</code> - The url.  
<a name="Request+arrayBuffer"></a>

### request.arrayBuffer()
Returns an arrayBuffer representation of the body, if possible.

Currently not implemented.

**Kind**: instance method of <code>[Request](#Request)</code>  
<a name="Request+blob"></a>

### request.blob()
Returns a blob-representation of the body, if possible.

Currently not implemented.

**Kind**: instance method of <code>[Request](#Request)</code>  
<a name="Request+formData"></a>

### request.formData()
Returns a formData-representation of the body, if possible.

Currently not implemented.

**Kind**: instance method of <code>[Request](#Request)</code>  
<a name="Request+json"></a>

### request.json() ⇒ <code>Promise</code>
Returns a json-representation of the body, wrapped in a Promise, if possible.

**Kind**: instance method of <code>[Request](#Request)</code>  
**Returns**: <code>Promise</code> - A promise which resolves with a json representation of the body.  
<a name="Request+text"></a>

### request.text() ⇒ <code>Promise</code>
Returns a text-representation of the body, wrapped in a Promise, if possible.

**Kind**: instance method of <code>[Request](#Request)</code>  
**Returns**: <code>Promise</code> - A promise which resolves with a text-representation of the body.  
<a name="Response"></a>

## Response
This class represents a mock of a window Response.
We have this class to be able to have a mutable version of a response.

Some, but not all of a window.Response's functionalities are implemented. In particular,
all properties are implemented, and all mutating methods are implemented. None of the
Body-inherited methods are implemented, but is readily available after toWindowResponse is called.

**Kind**: global class  

* [Response](#Response)
    * [new Response(config)](#new_Response_new)
    * [.body](#Response+body) ⇒ <code>string</code> &#124; <code>Object</code> &#124; <code>Blob</code> &#124; <code>FormData</code>
    * [.body](#Response+body)
    * [.ok](#Response+ok) ⇒ <code>boolean</code>
    * [.ok](#Response+ok)
    * [.status](#Response+status) ⇒ <code>Number</code>
    * [.status](#Response+status)
    * [.statusMessage](#Response+statusMessage) ⇒ <code>String</code>
    * [.statusMessage](#Response+statusMessage)
    * [.headers](#Response+headers) ⇒ <code>Headers</code>
    * [.headers](#Response+headers)
    * [.type](#Response+type)
    * [.type](#Response+type) ⇒ <code>String</code>
    * [.url](#Response+url)
    * [.url](#Response+url) ⇒ <code>String</code>
    * [.useFinalUrl](#Response+useFinalUrl)
    * [.useFinalUrl](#Response+useFinalUrl) ⇒ <code>Boolean</code>
    * [.clone()](#Response+clone) ⇒ <code>PseudoResponse</code>
    * [.redirect(url, status)](#Response+redirect) ⇒ <code>[Response](#Response)</code>
    * [.error()](#Response+error)
    * [.arrayBuffer()](#Response+arrayBuffer)
    * [.blob()](#Response+blob)
    * [.formData()](#Response+formData)
    * [.json()](#Response+json) ⇒ <code>Promise</code>
    * [.text()](#Response+text) ⇒ <code>Promise</code>

<a name="new_Response_new"></a>

### new Response(config)
Constructor of the pseudoresponse.


| Param | Type |
| --- | --- |
| config | <code>Object</code> | 

<a name="Response+body"></a>

### response.body ⇒ <code>string</code> &#124; <code>Object</code> &#124; <code>Blob</code> &#124; <code>FormData</code>
Returns the body.

**Kind**: instance property of <code>[Response](#Response)</code>  
**Returns**: <code>string</code> &#124; <code>Object</code> &#124; <code>Blob</code> &#124; <code>FormData</code> - Returns the body.  
<a name="Response+body"></a>

### response.body
Sets the body.

**Kind**: instance property of <code>[Response](#Response)</code>  

| Param | Type | Description |
| --- | --- | --- |
| body | <code>string</code> &#124; <code>Object</code> &#124; <code>Blob</code> &#124; <code>FormData</code> | The body |

<a name="Response+ok"></a>

### response.ok ⇒ <code>boolean</code>
Returns ok.

**Kind**: instance property of <code>[Response](#Response)</code>  
<a name="Response+ok"></a>

### response.ok
Ok can not be set, so this method throws an Error.

**Kind**: instance property of <code>[Response](#Response)</code>  

| Param | Type |
| --- | --- |
| ok | <code>Number</code> | 

<a name="Response+status"></a>

### response.status ⇒ <code>Number</code>
Returns the status.

**Kind**: instance property of <code>[Response](#Response)</code>  
**Returns**: <code>Number</code> - The status  
<a name="Response+status"></a>

### response.status
Sets the status of this response.
Also sets the ok-flag according to whether the status is in the range
200-299.

**Kind**: instance property of <code>[Response](#Response)</code>  

| Param | Type | Description |
| --- | --- | --- |
| status | <code>Number</code> | [description] |

<a name="Response+statusMessage"></a>

### response.statusMessage ⇒ <code>String</code>
Gets the statusMessage.

**Kind**: instance property of <code>[Response](#Response)</code>  
**Returns**: <code>String</code> - The status message.  
<a name="Response+statusMessage"></a>

### response.statusMessage
Tries to set the status message. Will always throw an error.

**Kind**: instance property of <code>[Response](#Response)</code>  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | Argument, which will be ignored. |

<a name="Response+headers"></a>

### response.headers ⇒ <code>Headers</code>
Gets the headers of this response.

**Kind**: instance property of <code>[Response](#Response)</code>  
**Returns**: <code>Headers</code> - The headers of this response.  
<a name="Response+headers"></a>

### response.headers
Sets the headers of this response.
If you want to set individual headers instead of the entire headers, object, you
should instead call get headers, and then edit the result in-place.

**Kind**: instance property of <code>[Response](#Response)</code>  

| Param | Type | Description |
| --- | --- | --- |
| headers | <code>Headers</code> | The headers |

<a name="Response+type"></a>

### response.type
Sets the type.

**Kind**: instance property of <code>[Response](#Response)</code>  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | The type to set. Typically 'basic', 'cors', 'error' or 'opaque' |

<a name="Response+type"></a>

### response.type ⇒ <code>String</code>
Returns the type.

**Kind**: instance property of <code>[Response](#Response)</code>  
**Returns**: <code>String</code> - The type  
<a name="Response+url"></a>

### response.url
Sets the url.

**Kind**: instance property of <code>[Response](#Response)</code>  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | A string-parameter representing the url. |

<a name="Response+url"></a>

### response.url ⇒ <code>String</code>
Gets the url.

**Kind**: instance property of <code>[Response](#Response)</code>  
**Returns**: <code>String</code> - The url.  
<a name="Response+useFinalUrl"></a>

### response.useFinalUrl
Sets the finalUrl.

**Kind**: instance property of <code>[Response](#Response)</code>  

| Param | Type | Description |
| --- | --- | --- |
| useFinalUrl | <code>Boolean</code> | A boolean. |

<a name="Response+useFinalUrl"></a>

### response.useFinalUrl ⇒ <code>Boolean</code>
Gets the finalUrl.

**Kind**: instance property of <code>[Response](#Response)</code>  
**Returns**: <code>Boolean</code> - Final url  
<a name="Response+clone"></a>

### response.clone() ⇒ <code>PseudoResponse</code>
Clones the PseudoResponse and creates a new clone of the object. Identical in every
way, but stored in a different variable.

**Kind**: instance method of <code>[Response](#Response)</code>  
<a name="Response+redirect"></a>

### response.redirect(url, status) ⇒ <code>[Response](#Response)</code>
Creates a new Response that is a redirect to the specified url.

**Kind**: instance method of <code>[Response](#Response)</code>  
**Returns**: <code>[Response](#Response)</code> - A new Response object,  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The url to redirect to |
| status | <code>Number</code> | The status |

<a name="Response+error"></a>

### response.error()
Throws an error from the response.

**Kind**: instance method of <code>[Response](#Response)</code>  
<a name="Response+arrayBuffer"></a>

### response.arrayBuffer()
Returns an arrayBuffer representation of the body, if possible.

Currently not implemented.

**Kind**: instance method of <code>[Response](#Response)</code>  
<a name="Response+blob"></a>

### response.blob()
Returns a blob-representation of the body, if possible.

Currently not implemented.

**Kind**: instance method of <code>[Response](#Response)</code>  
<a name="Response+formData"></a>

### response.formData()
Returns a formData-representation of the body, if possible.

Currently not implemented.

**Kind**: instance method of <code>[Response](#Response)</code>  
<a name="Response+json"></a>

### response.json() ⇒ <code>Promise</code>
Returns a json-representation of the body, wrapped in a Promise, if possible.

**Kind**: instance method of <code>[Response](#Response)</code>  
**Returns**: <code>Promise</code> - A promise which resolves with a json representation of the body.  
<a name="Response+text"></a>

### response.text() ⇒ <code>Promise</code>
Returns a text-representation of the body, wrapped in a Promise, if possible.

**Kind**: instance method of <code>[Response](#Response)</code>  
**Returns**: <code>Promise</code> - A promise which resolves with a text-representation of the body.  
<a name="PseudoServer"></a>

## PseudoServer
**Kind**: global class  
<a name="new_PseudoServer_new"></a>

### new PseudoServer()
This class represents a fake server. The server serves endpoints registered with it.

<a name="length"></a>

## length ⇒ <code>Number</code>
Returns the amount of headers present in this Headers-Object.

**Kind**: global variable  
**Returns**: <code>Number</code> - The amount.  
<a name="include"></a>

## include(condition) ⇒ <code>[Endpoint](#Endpoint)</code>
Adds an accept-function to the endpoint. When called, the endpoint will
go through all accept-functions to check for truthness. If either does not return a truthy value,
the call will fail with a 400 Bad Request.

**Kind**: global function  
**Returns**: <code>[Endpoint](#Endpoint)</code> - This  

| Param | Type | Description |
| --- | --- | --- |
| condition | <code>function</code> | The conditional function to check for                                     The function should accept two parameters: url and config |

<a name="exclude"></a>

## exclude(condition) ⇒ <code>[Endpoint](#Endpoint)</code>
Adds an reject-function to the endpoint. When called, the endpoint will go through
all reject-functions (after the accept-functions) to check for falseness. If either does return a truthy value,
the call will fail with a 400 Bad Request.

**Kind**: global function  
**Returns**: <code>[Endpoint](#Endpoint)</code> - This  

| Param | Type | Description |
| --- | --- | --- |
| condition | <code>function</code> | The conditiaonl function to check for |

<a name="setHeader"></a>

## setHeader(key, value) ⇒ <code>[Endpoint](#Endpoint)</code>
Sets a key-value pair of headers on this endpoint. This header will be sent back with any
response from this endpoint.

**Kind**: global function  
**Returns**: <code>[Endpoint](#Endpoint)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Header key |
| value | <code>string</code> | Header value |

<a name="respond"></a>

## respond(responseFunction) ⇒ <code>[Endpoint](#Endpoint)</code>
Defines the response to give when this endpoint is (succesfully) called.

**Kind**: global function  
**Returns**: <code>[Endpoint](#Endpoint)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| responseFunction | <code>function</code> | The response function of the endpoint |

<a name="send"></a>

## send(responseFunction) ⇒ <code>[Endpoint](#Endpoint)</code>
Alias for respond.

**Kind**: global function  
**Returns**: <code>[Endpoint](#Endpoint)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| responseFunction | <code>function</code> | The response function of the endpoint |

<a name="status"></a>

## status(status) ⇒ <code>[Endpoint](#Endpoint)</code>
Sets the status of this endpoint.

**Kind**: global function  
**Returns**: <code>[Endpoint](#Endpoint)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| status | <code>int</code> | The status of this endpoint. |

<a name="contentType"></a>

## contentType(type) ⇒ <code>[Endpoint](#Endpoint)</code>
Shortcut for setting the contentType header.

**Kind**: global function  
**Returns**: <code>[Endpoint](#Endpoint)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | The contentType value. |

<a name="_call"></a>

## _call(url, config) ⇒ <code>[Response](#Response)</code>
This method should be called when the endpoint is being requested.

The method will perform all actions necessary to make the endpoint behave as expected
on the basis of its configuration.

**Kind**: global function  
**Returns**: <code>[Response](#Response)</code> - Epic  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The url of the endpoint |
| config | <code>Object</code> | The object of the endpoint |

<a name="_callResponseFunction"></a>

## _callResponseFunction(request, response)
Overloads the Response function. If this.responseFunction is a function,
it will be called. If it is anything else, it will be interpreted as the body
to return.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| request | <code>[Request](#Request)</code> | The request object of the call |
| response | <code>[Response](#Response)</code> | The response object of the call. |

<a name="append"></a>

## append(key, value)
Appends a key to the Headers. If the key already exists, the value
will be appended to the list of values. This distinguishes it from the
set function, which will simply override all values of the specific key.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | [description] |
| value | <code>String</code> | [description] |

<a name="delete"></a>

## delete(key)
Deletes the header defined by the key-argument.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | A header-key, (e.g. Accept or Content-Type). |

<a name="entries"></a>

## entries() ⇒ <code>Iterator</code>
Returns an Iterator over all the entries of the Headers-object..

**Kind**: global function  
**Returns**: <code>Iterator</code> - An iterator over all key-value entries of the Headers-object.  
<a name="get"></a>

## get(key) ⇒ <code>Array</code>
Gets the header-value specified by a header key.

**Kind**: global function  
**Returns**: <code>Array</code> - A header-value.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | A header-key. |

<a name="getAll"></a>

## getAll() ⇒ <code>Array</code>
Alias for get.

**Kind**: global function  
**Returns**: <code>Array</code> - A header-value.  
<a name="has"></a>

## has(key) ⇒ <code>Boolean</code>
Returns true if this Headers-object has a header as inidicated
by the key-argument.

**Kind**: global function  
**Returns**: <code>Boolean</code> - True if the Headers-object has the header, false if not.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The key to check for |

<a name="keys"></a>

## keys() ⇒ <code>Iterator</code>
Returns and iterator over all the keys present in this Headers-object.

**Kind**: global function  
**Returns**: <code>Iterator</code> - All the keys of this Headers-object.  
<a name="set"></a>

## set(key, value)
Sets a header-key/value pair. Will overwrite all existing values of the specified key.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | [description] |
| value | <code>String</code> | [description] |

<a name="values"></a>

## values() ⇒ <code>Iterator</code>
Returns an iterator over all the values present in this Headers-object.

**Kind**: global function  
**Returns**: <code>Iterator</code> - All the values of this Headers-object.  
<a name="createEndpointHash"></a>

## createEndpointHash(url, method) ⇒ <code>String</code>
Creates an endpoint hash.
The hash is a combination of the url and the method parameters. Guarantees uniqueness
for distinct inputs.

**Kind**: global function  
**Returns**: <code>String</code> - Returned unique hash.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The url to hash. |
| method | <code>String</code> | The method to hash. |

<a name="route"></a>

## route(url, method) ⇒ <code>[Endpoint](#Endpoint)</code>
Registers a new route with the server. The method simply creates a new
Endpoint-instance, and adds it to the endpoints-dict of this server.

**Kind**: global function  
**Returns**: <code>[Endpoint](#Endpoint)</code> - The resulting endpoint.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>String</code> |  | The url of the endpoint. |
| method | <code>String</code> | <code>GET</code> | The method it accepts requests to. Typically GET/POST etc. |

<a name="get"></a>

## get(url) ⇒ <code>[Endpoint](#Endpoint)</code>
Alias for route(url, 'GET').

**Kind**: global function  
**Returns**: <code>[Endpoint](#Endpoint)</code> - The resulting endpoint.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The url of the endpoint. |

<a name="post"></a>

## post(url) ⇒ <code>[Endpoint](#Endpoint)</code>
Alias for route(url, 'POSt').

**Kind**: global function  
**Returns**: <code>[Endpoint](#Endpoint)</code> - The resulting endpoint.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The url of the endpoint. |

<a name="patch"></a>

## patch(url) ⇒ <code>[Endpoint](#Endpoint)</code>
Alias for route(url, 'PATCH').

**Kind**: global function  
**Returns**: <code>[Endpoint](#Endpoint)</code> - The resulting endpoint.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The url of the endpoint. |

<a name="put"></a>

## put(url) ⇒ <code>[Endpoint](#Endpoint)</code>
Alias for route(url, 'PUT').

**Kind**: global function  
**Returns**: <code>[Endpoint](#Endpoint)</code> - The resulting endpoint.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The url of the endpoint. |

<a name="delete"></a>

## delete(url) ⇒ <code>[Endpoint](#Endpoint)</code>
Alias for route(url, 'DELETE').

**Kind**: global function  
**Returns**: <code>[Endpoint](#Endpoint)</code> - The resulting endpoint.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The url of the endpoint. |

<a name="options"></a>

## options(url) ⇒ <code>[Endpoint](#Endpoint)</code>
Alias for route(url, 'OPTIONS').

**Kind**: global function  
**Returns**: <code>[Endpoint](#Endpoint)</code> - The resulting endpoint.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The url of the endpoint. |

<a name="head"></a>

## head(url) ⇒ <code>[Endpoint](#Endpoint)</code>
Alias for route(url, 'HEAD').

**Kind**: global function  
**Returns**: <code>[Endpoint](#Endpoint)</code> - The resulting endpoint.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The url of the endpoint. |

<a name="_call"></a>

## _call(url, config) ⇒ <code>Promise</code>
Calls this server.

**Kind**: global function  
**Returns**: <code>Promise</code> - Promise  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | Request url |
| config | <code>Object</code> | Request config |

