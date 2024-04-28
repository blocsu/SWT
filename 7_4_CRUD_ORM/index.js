//7_1_Использование форматаJSON
// const json1 = require('./package.json');
// console.log(json1.scripts.test);

// const rowjson2 = require('fs').readFileSync('./package.json');
// const json2 = JSON.parse(String(rowjson2));
// console.log(json2.scripts.test);

import {BSON} from 'bson';
import {readFileSync} from 'fs';
import dot from 'dotenv';
import x from 'express';
// import m from "mongoose";
import m from "mongodb";


// console.log(BSON.serialize({}));
// console.log(BSON.serialize({"goss": true}));
// const buffer = readFileSync('./users/users.bson');
// console.log(BSON.deserialize(buffer));


dot.config({path: './.env'});
const app = x();
const { URL } = process.env;
// const myURL = "mongodb://writer:writer@localhost/users";

const { MongoClient: { connect } } = m;

app
.use(async r => {
    const conn = await connect(URL, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = conn.db('users');
    const result = await db.collection('users').find().toArray();
    r.res.json(result);
})

app.listen(4321);