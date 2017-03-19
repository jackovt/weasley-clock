var express = require('express')
var router = express.Router()
var fs = require('fs')
var path = require('path');
var appDir = path.dirname(require.main.filename);

const familyFile = "family.json"
const familyPath = (appDir + '/data/' + familyFile)

// define the home page route
router.get('/', function (req, res) {
    var json = readFamily()
    console.log(familyPath)
    console.log(json)
    res.json(json)
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About Page')
})

function readFamily() {
    fs.readFile(familyPath, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err)
            return null
        } else {
            obj = JSON.parse(data)
            console.log(obj)
            return obj
        }
    });
}

module.exports = router