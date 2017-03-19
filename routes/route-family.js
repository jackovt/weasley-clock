var express = require('express')
var router = express.Router()
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
    fs.readFile(('../data/' + family_file), 'utf8', function readFileCallback(err, data){
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