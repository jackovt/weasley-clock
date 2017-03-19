const express = require('express')
const app = express()
const port = 3000

var route_main = require('./routes/route-main')

app.use((err, request, response, next) => {  
    // log the error, for now just console.log
    console.log(err);
    response.status(500).send('Something broke!')
});

app.all('/', function (req, res, next) {
    console.log(req);
  next() // pass control to the next handler
})

app.use('/', route_main)

app.listen(port)