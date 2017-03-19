var express = require('express')
var router = express.Router()
var fs = require('fs')
var path = require('path');
var appDir = path.dirname(require.main.filename);

const familyFile = "family.json"
const familyPath = (appDir + '/data/' + familyFile)

// define the home page route
router.get('/', function (req, res) {
    console.log(familyPath)
    res.json(readFamily())
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About Page')
})

function readFamily() {
    fs.readFile(familyPath, 'utf8', function readFileCallback(err, data){
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