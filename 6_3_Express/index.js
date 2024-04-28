const express = require('express');
const app = express();
const { createReadStream: cRS, writeFileSync: wFS, readFileSync: rFS } = require('fs');

const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
  };

app
.get('/sum1', (req, res) => {
    res.json({result: + req.query.n1 + +req.query.n2})
})
.get('/sum2/:n1/:n2', (req, res) => {
    res.json({result: +req.params.n1 + +req.params.n2})
})
.all('/ru', (req, res) => {
    res
    .status(200)
    .set({'Content-Type': 'text/html; charset=utf-8', ...CORS})
    .send(rFS('6_4_out.html'));//Uint8Array
 
})
.listen(4321);