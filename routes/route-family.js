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
    readFamily(res)
})

// define the home page route
router.get('/:familyMemberId', function (req, res) {
    var familyMemberId = req.params.familyMemberId
    console.log(familyMemberId)
    readFamily(res, familyMemberId)
})

// define the about route
router.get('/about', function (req, res) {
  res.send('About Page')
})

function readFamily(res, familyMemberId) {
    fs.readFile(familyPath, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err)
            throw new Error("can't read file")
        } else {
            obj = JSON.parse(data)
            if (obj) {
                if (!familyMemberId) {
                    console.log(obj)
                    res.json(obj)
                } else {
                    if (obj.members && obj.members.length && obj.members.length > 0) {
                        var familyMembers = obj.members
                        for (index = 0; index < familyMembers.length; ++index) {
                            var familyMember = familyMembers[index]
                            if (familyMember.id === familyMemberId) {
                                console.log(familyMember)
                                res.json(familyMember)
                                return;
                            }
                        }
                    }
                    throw new Error("can't find family member")
                    return;
                }
            } else {
                console.log("family obj was null")
                throw new Error("can't get family")
            }
        }
    });
}

module.exports = router