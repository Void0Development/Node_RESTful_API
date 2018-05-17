//inloggen met web token!
const config = require('./config');
const moment = require('moment');
const jwt = require('jwt-simple');

//de gebruikersnaam naar een token
function encodeToken(username, id) {
    const payload = {
        exp: moment().add(60, 'minutes').unix(), //expiration tijd  van token
        iat: moment().unix(),
        sub: username//,
       // id: id
    };

    return jwt.encode(payload, config.secretKey);
}

//token decoderen
function decodeToken(token, callback) {
    try {
        const payload = jwt.decode(token, config.secretKey);
        // Check if the token has expired
        const now = moment().unix();
        if(now > payload.exp) {
            callback('Token has expired', null);
        } else {
            callback(null, payload);
        }
    } catch(error) {
        callback(error, null);
    }
}

module.exports = { encodeToken, decodeToken };