# Express

```CMD
"express": "^4.17.1",
```
## Create app
Using Express function create app object and add  port to listen method

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
can generate new application with view engine

## Serving static files in Express
To use multiple static assets directories, call the express.static middleware function multiple times:
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
* Using defining mathod and url path
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
* Examples of route paths based on regular expressions:

```javascript
// This route path will match anything with an “a” in it.
app.get(/a/, (req, res) => {})
// This route path will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.
app.get(/.*fly$/, (req, res) => {})
```
* Route parameters
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
* Route handlers
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
# Response methods

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
* Using app.route()
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


* Using express router
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