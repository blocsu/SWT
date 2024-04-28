const { Server } = require('http');
const finalhandler = require('finalhandler');
const serve = require('serve-static')('.');

const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'x-test,Content-Type,Accept,Access-Control-Allow-Headers'
};

const s = Server();
s.on('request', (req, res) => {
    let body = '';
    if (req.url === '/result4/') {
        req.on('data', function (chunk) {
            console.log("chunk is " + chunk);
            body += chunk;
        })

        req.on('end', function () {
            console.log(body);
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8',
                ...CORS
            })            
            res.end(`{"message":"dotsenkosar","x-result":"${req.headers['x-test']}","x-body":"${body}"}`)
        })
    } else {
        return serve(req, res, finalhandler(req, res));
    }    
})
s.listen(5432);