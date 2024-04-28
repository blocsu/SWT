import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import m from 'mongoose';
import dot from 'dotenv';
import {createReadStream} from 'fs';
import crypto from 'crypto';
import http from 'http';
import appSrc from './app.js';
import CORS from './CORS.js';
import UserModel from './models/User.js';
import UserController from './routes/UserController.js';

dot.config({path: './.env'});
const { URL } = process.env;
const User = UserModel(m);
const app = appSrc(express, bodyParser, createReadStream, crypto, http, CORS, User, UserController, cookieParser);

try {
    await m.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true});
    app.listen(process.env.PORT ?? 4321);
} catch(e) {
    console.log(e.codeName);
}
