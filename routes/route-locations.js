var express = require('express')
var path = require('path')
var appDir = path.dirname(require.main.filename)
var locationsDao = require(appDir + '/data/locations-dao.js')

var router = express.Router()

// GET all the locations
router.get('/', function (req, res) {
    locationsDao.getAllLocations(function(locations) {
        res.json(locations)
    })
})

// GET the locations member by id
router.get('/:locationId', function (req, res) {
    var locationId = req.params.locationId
    console.log(locationId)
    locationsDao.getLocationById(locationId, function(location) {
        res.json(location)
    })
})

// GET the location by the id of this family member
router.get('/family/:familyMemberId', function (req, res) {
    var familyMemberId = req.params.familyMemberId
    console.log(familyMemberId)
    locationsDao.getLocationByFamilyMemberId(familyMemberId, function(location) {
        res.json(location)
    })
})

module.exports = router