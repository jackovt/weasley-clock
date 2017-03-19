const express = require('express');
const app = express();
const port = 3000;

app.use((err, request, response, next) => {  
    // log the error, for now just console.log
    console.log(err);
    response.status(500).send('Something broke!');
});

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.listen(port);