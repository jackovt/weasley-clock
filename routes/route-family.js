var express = require('express')
var path = require('path')
var appDir = path.dirname(require.main.filename)
var familyDao = require(appDir + '/data/family-dao.js')

var router = express.Router()

// define the home page route
router.get('/', function (req, res) {
    familyDao.getAllFamily(function(family) {
        res.json(family)
    })
})

// define the home page route
router.get('/:familyMemberId', function (req, res) {
    var familyMemberId = req.params.familyMemberId
    console.log(familyMemberId)
    familyDao.getFamilyById(familyMemberId, function(family) {
        res.json(family)
    })
})

// define the home page route
router.get('/location/:locationId', function (req, res) {
    var locationId = req.params.locationId
    console.log(locationId)
    familyDao.getFamilyByLocationId(locationId, function(family) {
        res.json(family)
    })
})

module.exports = router