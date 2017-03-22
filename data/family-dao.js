module.exports = {
    getAllFamily: function(callback) {
        readFamily(null, callback);
    },
    getFamilyById: function(callback, familyMemberId) {
        readFamily(familyMemberId, callback);
    },
    getFamilyByLocationId: function(locationId, callback) {
        readFamilyByLocation(locationId, callback);
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

function readFamily(familyMemberId, callback) {
    readFamilyJson(function(family) {
        if (family) {
            if (!familyMemberId) {
                console.log(family)
                callback(family)
            } else {
                if (family.members && family.members.length && family.members.length > 0) {
                    var familyMembers = family.members
                    for (index = 0; index < familyMembers.length; ++index) {
                        var familyMember = familyMembers[index]
                        if (familyMember.id === familyMemberId) {
                            console.log(familyMember)
            				callback(familyMember)
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
    });
}

function readFamilyByLocation(locationId, callback) {
    readFamilyJson(function(family) {
        if (family) {
            if (locationId) {
                if (family.members && family.members.length && family.members.length > 0) {
                    var familyMembers = family.members
                    for (index = 0; index < familyMembers.length; ++index) {
                        var familyMember = familyMembers[index]
                        if (familyMember.location === locationId) {
                            console.log(familyMember)
            				callback(familyMember)
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
    });
}