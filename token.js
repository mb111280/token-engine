/************************************************
FILENAME
token.js

DESCRIPTION
Collection of functions relating to token management

*************************************************/

var validateToken = function(token,number) {
    if ( token > 0 && token <= (number)) {
        console.log("token past validation");
        return 1;
    } else {
        console.log("token failed validation");
        return 0;
    } 
}

module.exports.validateToken = validateToken;