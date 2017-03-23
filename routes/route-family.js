var express = require('express')
var path = require('path')
var appDir = path.dirname(require.main.filename)
var familyDao = require(appDir + '/data/family-dao.js')

var router = express.Router()

// GET all the family
router.get('/', function (req, res) {
    familyDao.getAllFamily(function(family) {
        res.json(family)
    })
})

// GET the family member by id
router.get('/:familyMemberId', function (req, res) {
    var familyMemberId = req.params.familyMemberId
    console.log(familyMemberId)
    familyDao.getFamilyById(familyMemberId, function(family) {
        res.json(family)
    })
})

// POST the location to this family member by id
router.post('/:familyMemberId', function (req, res) {
    var familyMemberId = req.params.familyMemberId
    var body = req.body;
    console.log(familyMemberId)
    familyDao.updateFamilyLocationById(familyMemberId, body, function(family) {
        res.json(family)
    })
})

// GET the family members at the location with this id
router.get('/location/:locationId', function (req, res) {
    var locationId = req.params.locationId
    console.log(locationId)
    familyDao.getFamilyByLocationId(locationId, function(family) {
        res.json(family)
    })
})

module.exports = router