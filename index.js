const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

var route_main = require('./routes/route-main')
var route_family = require('./routes/route-family')
var route_locations = require('./routes/route-locations')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((err, request, response, next) => {  
    // log the error, for now just console.log
    console.log(err);
    response.status(500).send('Something broke!')
})

app.use('/', route_main)
app.use('/family', route_family)
app.use('/locations', route_locations)

app.listen(port)