var express = require('express')
var router = express.Router()
var fs = require('fs')
var path = require('path');
var appDir = path.dirname(require.main.filename);

const familyFile = "family.json"
const familyPath = (appDir + '/data/' + familyFile)

// define the home page route
router.get('/', function (req, res) {
    var json = readFamily(res)
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About Page')
})

function readFamily(res) {
    fs.readFile(familyPath, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err)
            throw new Error("can't read file")
        } else {
            obj = JSON.parse(data)
            console.log(familyPath)
            console.log(obj)
            res.json(obj)
        }
    });
}

module.exports = router