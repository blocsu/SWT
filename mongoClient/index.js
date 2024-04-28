import m from "mongoose";
const myURL = "mongodb://writer:writer@localhost/users";
await m.connect(myURL); 
const User = m.model('users', m.Schema()); 
console.log((await User.find())[0]);


/*
, { useNewUrlParser: true, useUnifiedTopology: true }

*/