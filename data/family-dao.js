var fs = require('fs')
var path = require('path')
var appDir = path.dirname(require.main.filename)

const familyFile = "family.json"
const familyPath = (appDir + '/data/' + familyFile)

module.exports = {
    getAllFamily: function(callback) {
        readFamily(null, callback);
    },
    getFamilyById: function(familyMemberId, callback) {
        readFamily(familyMemberId, callback);
    },
    getFamilyByLocationId: function(locationId, callback) {
        readFamilyByLocation(locationId, callback);
    },
    updateFamilyLocationById: function(familyMemberId, location, callback) {
    	setFamilyLocationById(familyMemberId, location, callback);
    }
};

function readFamilyJson(callback) {
    fs.readFile(familyPath, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err)
            throw new Error("can't read file")
        } else {
            family = JSON.parse(data)
            callback(family)
        }
    });
}

function writeFamilyToFile(family, callback) {
    fs.writeFile(familyPath, JSON.stringify(family, null, 2), 'utf8', function readFileCallback(err){
        if (err){
            console.log(err)
            throw new Error("can't write file")
        } else {
        	console.log("successfully updated json file")
            callback(family)
            return;
        }
    });
}

function readFamily(familyMemberId, callback) {
    readFamilyJson(function(family) {
        if (family) {
            if (!familyMemberId) {
                console.log(family)
                callback(family)
            } else {
            	var familyMember = getFamilyMemberById(familyMemberId, family);
            	if (familyMember) {
            		callback(familyMember)
            		return;
            	}
                throw new Error("can't find family member")
                return;
            }
        } else {
            console.log("family obj was null")
            throw new Error("can't get family")
        }
    });
}

function readFamilyByLocation(locationId, callback) {
    readFamilyJson(function(family) {
        if (family) {
            if (locationId) {
                if (family.members && family.members.length && family.members.length > 0) {
                    var familyMembers = family.members
                    var familyAtLocation = []
                    for (index = 0; index < familyMembers.length; ++index) {
                        var familyMember = familyMembers[index]
                        if (familyMember.location === locationId) {
                            familyAtLocation.push(familyMember)
                        }
                    }
                    console.log(familyAtLocation)
    				callback(familyAtLocation)
                    return;
                }
                throw new Error("can't find family member")
                return;
            }
        } else {
            console.log("family obj was null")
            throw new Error("can't get family")
        }
    });
}


function setFamilyLocationById(familyMemberId, location, callback) {
	if (!familyMemberId || !location || !callback) {
		throw new Error("missing parameters")
		return;
	}
	if (location.locationId) {
		var locationId = location.locationId;
		console.log("locationId: " + locationId)
		readFamily(null, function(family){
			if (isValidFamily(family)) {
		        var familyMembers = family.members
		        var familyMember = null
		        for (index = 0; index < familyMembers.length; ++index) {
		            familyMember = familyMembers[index]
		            if (familyMember.id === familyMemberId) {
		                console.log("before: " + familyMember)
						familyMember.location = locationId
						family.members[index] = familyMember
		                console.log("before: " + familyMember)
		                break;
		            }
		        }
		        writeFamilyToFile(family, callback)
		        return;
			} else {
				throw new Error("family is not valid")
				return;
			}
		})
	}
	else {
		throw new Error("no locationId")
		return;
	}
}

function getFamilyMemberById(familyMemberId, family) {
	console.log("getFamilyMemberById(): familyMemberId: " + familyMemberId)
	console.log("getFamilyMemberById(): family: " + family)
	if (familyMemberId && isValidFamily(family)) {
        var familyMembers = family.members
        for (index = 0; index < familyMembers.length; ++index) {
            var familyMember = familyMembers[index]
            if (familyMember.id === familyMemberId) {
                console.log(familyMember)
				return familyMember;
            }
        }
	}
}

function isValidFamily(family) {
	return (family && family.members && family.members.length && family.members.length > 0);
}