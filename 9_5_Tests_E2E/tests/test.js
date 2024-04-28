import request from 'supertest';

import express from 'express';
import bodyParser from 'body-parser';
import m from 'mongoose';
import dot from 'dotenv';
import fs from 'fs';
import CORS from '../CORS.js';
import UserModel from '../models/User.js';
import UserController from '../routes/UserController.js';
import http from 'http';

import appSrc from '../app.js';
import { isTypedArray } from 'util/types';

dot.config({ path: './.env' });
const { URL } = process.env;
const User = UserModel(m);

const app =appSrc(express, bodyParser, fs, CORS, User, UserController);

const server = request(app);

//"scripts": {"test": "node --experimental-vm-modules node_modules/.bin/jest"}
describe('login endpoint', () => {// запускается командой npm test
    it('is expected to return text "dotsenkosar"', async () => {
        const result = await server.get('/login/');
        expect(result.text).toEqual('dotsenkosar');        
    });
    it('is expected to return code status 200', async () => {
        const result = await server.get('/login/');        
        expect(result.statusCode).toEqual(200);
    });
});

