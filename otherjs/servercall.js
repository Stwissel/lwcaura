const https = require('https');
const options = {
    host: 'login.salesforce.com',
    port: 443,
    path: '/',
    method: 'GET'
};

https
    .request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers, null, 2));
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            console.log('BODY: ' + chunk);
        });
    })
    .end();
