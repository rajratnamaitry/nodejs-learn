# Express

```CMD
"express": "^4.17.1",
```
## Create app
* Using Express function create app object and add  port to listen method
```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```
## Express application generator
* Can generate new application with view engine

## Serving static files in Express
* To use multiple static assets directories, call the express.static middleware function multiple times:
```javascript
app.use(express.static('public'))
// http://localhost:3000/images/kitten.jpg
// http://localhost:3000/css/style.css
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public'))
// http://localhost:3000/static/images/kitten.jpg
// http://localhost:3000/static/css/style.css
```
## Routing
### Using defining mathod and url path
* aap.METHOD(url)
```javascript
const express = require('express')
const app = express()
// GET method route
app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage')
})
//  the following handler is executed for requests to the route “/secret” whether using GET, POST, PUT, DELETE, or any other HTTP request method supported
app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```
### Examples of route paths based on regular expressions:

```javascript
// This route path will match anything with an “a” in it.
app.get(/a/, (req, res) => {})
// This route path will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.
app.get(/.*fly$/, (req, res) => {})
```
### Route parameters
```javascript
/**
 * Route path: /users/:userId/books/:bookId
 * Request URL: http://localhost:3000/users/34/books/8989
 * req.params: { "userId": "34", "bookId": "8989" }
*/
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})
// Since the hyphen (-) and the dot (.) are interpreted literally, they can be used along with route parameters for useful purposes.
/**
 * Route path: /flights/:from-:to
 * Request URL: http://localhost:3000/flights/LAX-SFO
 * req.params: { "from": "LAX", "to": "SFO" }
 * Route path: /plantae/:genus.:species
 * Request URL: http://localhost:3000/plantae/Prunus.persica
 * req.params: { "genus": "Prunus", "species": "persica" }
 */
```
### Route handlers
More than one callback function can handle a route
```javascript
app.get('/example/b', (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from B!')
})

app.get('/example/c', [cb0, cb1, cb2])

app.get('/example/d', [cb0, cb1], (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from D!')
})
```
### Response methods

|Method	|Description|
|-------|-----------|
|res.download() |	Prompt a file to be downloaded.|
|res.end() |	End the response process.|
|res.json() |	Send a JSON response.|
|res.jsonp() |	Send a JSON response with JSONP support.|
|res.redirect() |	Redirect a request.|
|res.render() |	Render a view template.|
|res.send() |	Send a response of various types.|
|res.sendFile() |	Send a file as an octet stream.|
|res.sendStatus() |	Set the response status code and send its string representation as the response body.|

```javascript
// redirect
res.redirect('http://example.com')
res.redirect(301, 'http://example.com')
// render
res.render('index', function (err, html) {
  res.send(html)
})
// status send 
res.status(404).send('Sorry, we cannot find that!')
// send file
var fileName = req.params.name
res.sendFile(fileName, options, function (err) {
  if (err) {
    next(err)
  } else {
    console.log('Sent:', fileName)
  }
})
```
### Using app.route()
```javascript
app.route('/book')
  .get((req, res) => {
    res.send('Get a random book')
  })
  .post((req, res) => {
    res.send('Add a book')
  })
  .put((req, res) => {
    res.send('Update the book')
  })
```


### Using express router
```javascript
// routes/tourRouters.js
const express = require('express');
const toursController = require('../controller/toursController');
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router
    .route('/')
    .get(toursController.getAllTour)
    .post(toursController.addTour);

module.exports = router;

// app.js
const tourRouter = require('./routes/tourRouters');
app.use('/api/v2/tour',tourRouter);
```
## Middleware 
### Perform the following tasks:
  * Execute any code.
  * Make changes to the request and the response objects.
  * End the request-response cycle.
  * Call the next middleware in the stack.
```javascript
const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
```
### Configurable middleware
export a function which accepts an options object or other parameters, which, then returns the middleware implementation based on the input parameters
```javascript
// my-middleware.js
module.exports = function (options) {
  return function (req, res, next) {
    // Implement the middleware function based on the options object
    next()
  }
}
// app.js
const mw = require('./my-middleware.js')

app.use(mw({ option1: '1', option2: '2' }))
```
### Application-level middleware
```javascript
app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})
```
### Router-level middleware
```javascript
const router = express.Router()

// a middleware function with no mount path. This code is executed for every request to the router
router.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})
// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl)
  next()
}, (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})
// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', (req, res, next) => {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next()
}, (req, res, next) => {
  // render a regular page
  res.render('regular')
})

// mount the router on the app
app.use('/', router);
```
### Error-handling middleware
Except with four arguments instead of three, specifically with the signature (err, req, res, next)):
```javascript
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```
### Built-in middleware
* express.static serves static assets such as HTML files, images, and so on.
* express.json parses incoming requests with JSON payloads. NOTE: Available with Express 4.16.0+
* express.urlencoded parses incoming requests with URL-encoded payloads. NOTE: Available with Express 4.16.0+

```javascript
app.use(express.static('public', options))
```
### Third-party middleware
```javascript
const cookieParser = require('cookie-parser')
// load the cookie-parsing middleware
app.use(cookieParser())
```
## Overriding the Express API
```javascript
app.response.sendStatus = function (statusCode, type, message) {
  // code is intentionally kept simple for demonstration purpose
  return this.contentType(type)
    .status(statusCode)
    .send(message)
}
// 
res.sendStatus(404, 'application/json', '{"error":"resource not found"}')
//
Object.defineProperty(app.request, 'ip', {
  configurable: true,
  enumerable: true,
  get () { return this.get('Client-IP') }
})
//

```
## Express behind proxies

```javascript
// You can set IP addresses in any of the following ways:
app.set('trust proxy', 'loopback') // specify a single subnet
app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array

// Custom trust implementation.
app.set('trust proxy', (ip) => {
  if (ip === '127.0.0.1' || ip === '123.123.123.123') return true // trusted IPs
  else return false
})
```
## Process managers for Express apps
When you run Express apps for production, it is helpful to use a process manager to:
* Restart the app automatically if it crashes.
* Gain insights into runtime performance and resource consumption.
* Modify settings dynamically to improve performance.
* Control clustering

The most popular process managers for Express and other Node.js applications are:

* Forever: A simple command-line interface tool to ensure that a script runs continuously (forever). Forever’s simple interface makes it ideal for running smaller deployments of Node.js apps and scripts.
* PM2: A production process manager for Node.js applications that has a built-in load balancer. PM2 enables you to keep applications alive forever, reloads them without downtime, helps you to manage application logging, monitoring, and clustering.

## Best Practices: Security
### Don’t use deprecated or vulnerable versions
Express 2.x and 3.x are no longer maintained.
### Use TLS
If your app deals with or transmits sensitive data, use Transport Layer Security (TLS) to secure the connection and the data. This technology encrypts data before it is sent from the client to the server
### Use Helmet
Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
### Reduce Fingerprinting
```javascript
app.disable('x-powered-by')
```
### Use cookies securely
* express.session middleware built-in to Express 3.x.
* express.cookieSession middleware built-in to Express 3.x.
```javascript
const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'example.com',
    path: 'foo/bar',
    expires: expiryDate
  }
}))
```
### Prevent brute-force attacks against authorization
* The first is number of consecutive failed attempts by the same user name and IP address.
* The second is number of failed attempts from an IP address over some long period of time. For example, block an IP address if it makes 100 failed attempts in one day.

### Ensure your dependencies are secure
```CMD
npm audit
... 
npm install -g snyk
// Use this command to test your application for vulnerabilities:
snyk test

```
### Additional considerations
* Always filter and sanitize user input to protect against cross-site scripting (XSS) and command injection attacks.
* Defend against SQL injection attacks by using parameterized queries or prepared statements.
* Use the open-source sqlmap tool to detect SQL injection vulnerabilities in your app.
* Use the nmap and sslyze tools to test the configuration of your SSL ciphers, keys, and renegotiation as well as the validity of your certificate.

## Performance and reliability
Here are some things you can do in your code to improve your application’s performance:
### Use gzip compression
Gzip compressing can greatly decrease the size of the response body and hence increase the speed of a web app.
```javascript
const compression = require('compression')
app.use(compression())
```
### Don’t use synchronous functions
Synchronous functions and methods tie up the executing process until they return.
### Do logging correctly
Using console.log() or console.error() to print log messages to the terminal is common practice in development. But these functions are synchronous when the destination is a terminal or a file, so they are not suitable for production, unless you pipe the output to another program.
### Handle exceptions properly
* Use try-catch
* Use promises

## Things to do in your environment / setup
### Set NODE_ENV to “production”
* Cache view templates.
* Cache CSS files generated from CSS extensions.
* Generate less verbose error messages.
### Ensure your app automatically restarts
Using a process manager to restart the app (and Node) when it crashes.

### Run your app in a cluster
### Cache request results
### Use a load balancer
One way to scale an app is to run multiple instances of it and distribute the traffic via a load balancer. Setting up a load balancer can improve your app’s performance and speed, and enable it to scale more than is possible with a single instance.

A load balancer is usually a reverse proxy that orchestrates traffic to and from multiple application instances and servers. You can easily set up a load balancer for your app by using Nginx or HAProxy.
### Use a reverse proxy
A reverse proxy sits in front of a web app and performs supporting operations on the requests, apart from directing requests to the app. It can handle error pages, compression, caching, serving files, and load balancing among other things.

## Graceful shutdown
When you deploy a new version of your application, you must replace the previous version. The process manager you’re using will first send a SIGTERM signal to the application to notify it that it will be killed. Once the application gets this signal, it should stop accepting new requests, finish all the ongoing requests, clean up the resources it used, including database connections and file locks then exit.

```javascript
const server = app.listen(port)

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    debug('HTTP server closed')
  })
})
```
## Health checks
A load balancer uses health checks to determine if an application instance is healthy and can accept requests.
### Express-actuator
express-actuator is a middleware to add endpoints to help you monitor and manage applications.
```javascript
const actuator = require('express-actuator')
const app = express()
app.use(actuator())
app.listen(3000)
```


