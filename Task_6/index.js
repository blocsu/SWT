import express from 'express';
import bodyParser from 'body-parser';
import m from 'mongoose';
import {createReadStream} from 'fs';
import crypto from 'crypto';
import http from 'http';
import appSrc from './app.js';

// const URL = 'mongodb://inserter:Qwerty.123i@kodaktor.ru/readusers';
const UserModel = m => {
    const UserSchema = m.Schema({
        login: String,
        password: {
            type: String,
            required: [true, 'Password is necessity!']
        }
    });
    return m.model('User', UserSchema);
}
const User = UserModel(m);
const app = appSrc(express, bodyParser, createReadStream, crypto, http, User, m);

// try {
//     await m.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true});
    app.listen(process.env.PORT ?? 5321);
// } catch(e) {
//     console.log(e.codeName);
// }