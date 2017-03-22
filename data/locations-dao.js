var fs = require('fs')
var path = require('path')
var appDir = path.dirname(require.main.filename)
var familyDao = require(appDir + '/data/family-dao.js')
const locationsFile = "locations.json"
const locationsPath = (appDir + '/data/' + locationsFile)

module.exports = {
    getAllLocations: function(callback) {
        readLocations(null, callback);
    },
    getLocationById: function(locationId, callback) {
        readLocations(locationId, callback);
    },
    getLocationByFamilyMemberId: function(familyMemberId, callback) {
        readLocationByFamilyMemberId(familyMemberId, callback);
    }
};

function readLocationsJson(callback) {
    fs.readFile(locationsPath, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err)
            throw new Error("can't read file")
        } else {
            locationsObj = JSON.parse(data)
            callback(locationsObj)
        }
    });
}

function readLocations(locationId, callback) {
    readLocationsJson(function(locationsObj) {
        if (locationsObj) {
            if (!locationId) {
                console.log(locationsObj)
                callback(locationsObj)
            } else {
                if (locationsObj.locations && locationsObj.locations.length && locationsObj.locations.length > 0) {
                    var locations = locationsObj.locations
                    for (index = 0; index < locations.length; ++index) {
                        var location = locations[index]
                        if (location.id === locationId) {
                            console.log(location)
            				callback(location)
                            return;
                        }
                    }
                }
                throw new Error("can't find location")
                return;
            }
        } else {
            console.log("locations obj was null")
            throw new Error("can't get locations")
        }
    });
}

function readLocationByFamilyMemberId(familyMemberId, callback) {
    if (familyMemberId) {
        familyDao.getFamilyById(familyMemberId, function(familyMember){
            if (familyMember) {
                var locationId = familyMember.location;
                readLocationsJson(function(locationsObj) {
                    if (locationsObj) {
                        if (locationsObj.locations && locationsObj.locations.length && locationsObj.locations.length > 0) {
                            var locations = locationsObj.locations
                            for (index = 0; index < locations.length; ++index) {
                                var location = locations[index]
                                if (location.id === locationId) {
                                    console.log(location)
                                    callback(location)
                                    return;
                                }
                            }
                            throw new Error("can't find location member")
                            return;
                        }
                    } else {
                        console.log("locations obj was null")
                        throw new Error("can't get locations")
                    }
                });
            }
        })
    }
}