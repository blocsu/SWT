import m from 'mongoose';

const myURL = 'mongodb://mongostudent:studentmongo@kodaktor.ru/mongodemo';
await m.connect(myURL);
const Q = m.model('Question', m.Schema());
console.log(await Q.find()[0]);