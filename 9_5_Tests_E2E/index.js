import express from 'express';
import cluster from 'cluster';
import os from 'os';
import puppeteer from "puppeteer";
import bodyParser from 'body-parser';
import m from 'mongoose';
import dot from 'dotenv';
import fs from 'fs';
import crypto from 'crypto';
import appSrc from './app.js';
import CORS from './CORS.js';
import UserModel from './models/User.js';
import UserController from './routes/UserController.js';

dot.config({ path: './.env' });
const { URL } = process.env;
const User = UserModel(m);
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    for(let i=0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died.`);
    });
}else {
    const app = appSrc(express, bodyParser, fs, crypto, CORS, User, UserController, puppeteer);

    try {
        await m.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
        app.listen(process.env.PORT ?? 4321);
    } catch(e) {
        console.log(e.codeName);
    }
}