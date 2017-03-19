var express = require('express')
var router = express.Router()
var fs = require('fs')
var path = require('path');
var appDir = path.dirname(require.main.filename);

const family_file = "family.json"

// define the home page route
router.get('/', function (req, res) {
    res.json(readFamily())
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About Page')
})

function readFamily() {
    fs.readFile((appDir + '/data/' + family_file), 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err)
        } else {
            obj = JSON.parse(data) //now it an object
            return obj
        }
    });
    return null
}

module.exports = router