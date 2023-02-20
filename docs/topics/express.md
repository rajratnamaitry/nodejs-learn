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