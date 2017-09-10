/************************************************
FILENAME
token-engine.js

DESCRIPTION
Creates a web service that requests a token code from user via a web form.
If token is submitted, returns value assigned to that token.

HOW TO START TOKEN ENGINE:
1) from terminal run 'node token-engine.js'
2) open web browser visit http://127.0.0.1:8080

*************************************************/

// Include the HTTP Node library
// http://nodejs.org/docs/latest/api/http.html
var http = require('http');
var url = require("url");

// define the 
var localIP = "127.0.0.1"; // local host
var port = 8080;

var defaultName = "Token Engine";
var tokenCode = "";
var itemList = ["item1","item2","item3","item4","item5"]
var item = "";

var server = http.createServer(function (req, res) {
    
    // Print to terminal that server has been requested
    console.log("Recieved request on " + req.url);

    /********************************************/
    /*  GET DATA FROM THE URL'S QUERYSTRING     */
    /********************************************/
    // Get the request url
    var urlObj = url.parse(req.url, true);

    // Just for debugging - print out any querystring variables
    for(q in urlObj['query']) {
            console.log( q + " = " + urlObj['query'][q]);
    }
    
    // update the variable tokenCode if token is passed from querystring
    // and assign item  from itemList
    if (urlObj['query']['tokenCode'] != undefined) {
        
        console.log("tokenCode received: " + urlObj['query']['tokenCode']);

        // reset tokenCode before collecting value
        tokenCode = "";
        // collect  tokenCode from  query stsring
        tokenCode = urlObj['query']['tokenCode']; // i.e. ?tokencode=1
        // Test if submitted token code is in valid range
        if ( validateToken(tokenCode,itemList.length) ) {
            item = itemList[tokenCode -1];
            console.log("token exhanged for item: " + item.valueOf())
        } else {
            item = "Sorry, invalid token";
        }
    }
    
    /************************************/
    /*  START HTTP RESPONSE TO BROWSER  */
    /************************************/
    
    // prepare HTTP response header
    res.writeHead(200, {'Content-Type': 'text/html'});

    // HTTP response body
    res.write('<html>\n<body>\n');
    res.write('<h1>' + defaultName + '<h1>\n');
    res.write('<h1>Token Code: ' + tokenCode + '= ' + item.valueOf() + '<h1>\n');
    res.write('<form method="GET">\n<input type="text" placeholder="Token code:" name="tokenCode">\n<input type="submit" value="submit token code">\n</form>\n');
    res.write('</body>\n</html>');
    
    // HTTP response finished
    res.end();
    
});

server.listen(port, localIP);

// print message to terminal that server is running
console.log('Server running at http://'+ localIP +':'+ port +'/');


function validateToken(token,number) {
    if ( token > 0 && token < (number)) {
        console.log("token past validation");
        return 1;
    } else {
        console.log("token failed validation");
        return 0;
    }
}