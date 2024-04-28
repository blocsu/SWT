import BSON from 'bson';
import {readFileSync} from 'fs';

const buffer = readFileSync('./dump/users/users.bson');
console.log(BSON.deserialize(buffer));