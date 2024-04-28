//require('express')().use((r1, r2, next, a = 5555) => next(42)).get('*', (req, res) => res.send('OK')).listen(8888); //1_Вопрос_Ответ_42
// require('express')().get('*', (req, res) => res.write('OK')).listen(8888); //2_Вопрос_Ответ_--max-time 2 -------------8_Вопрос_Ответ_chunked


//4. Какой объект в Fetch API предоставляет доступ к потоку? //4_Вопрос_Ответ_Response.body 
// require('express')().get('*', (req, res) =>  res.end('a') && res.writeHead(200, {b: 1})).listen(8888); //5_Вопрос_В консоли редактора: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

require('express')().get('*', (req, res) => {let result = []; res.send(+result) }).listen(8888); //9_Вопрос_Ответ_RangeError [ERR_HTTP_INVALID_STATUS_CODE]: Invalid status code: 0
//=====================================task_1======================
/*function task(x) {
  return http.Server((req, res) => {
    if(req.url === '/challenge') {     
      res.end(x);
    }else if(req.url.startsWith('/api/rv/')) {
       const param = req.url.substring(8);
       let str = ''; 
       for (let i = param.length-1; i >= 0; i--) {str += param[i];};      
       res.end(str);
    }else{
      res.end('No');     
    }   
 });
} */
// const s = require('http').Server((req, res) => {
//     if(req.url === '/challenge') {     
//       res.end(x);
//     }else if(req.url.startsWith('/api/rv/')) {
//        const secs = req.url.substring(8);
//        let str = ''; 
//        for (let i = secs.length-1; i >= 0; i--) {str += secs[i];};      
//        res.end(str);
//     }else{
//       res.end('No');     
//     }   
//  }).listen(8888);
 //===============================task 2===================================
//  require('express')().get('/login', r => r.res.send('javascripter'))
//   .get('/deg/:n1/:n2', (req, res) => {
//   const n1 = req.params.n1;
//   const n2 = req.params.n2;
//   const pow = n1**n2;
//   res.send(pow.toString());
// }).listen(8888);
//================================_Неделя_7_Опрос_3_===========================
// // import m from 'mongoose';

// // const myURL = 'mongodb://mongostudent:studentmongo@kodaktor.ru/mongodemo';
// // await m.connect(myURL, {useNewUrlParser: true, useUnifiedTopology: true});
// // const Q = m.model('question', m.Schema());
// // console.log(await Q.find());

// import m from 'mongoose';
// await m.connect('mongodb://mongostudent:studentmongo@kodaktor.ru/mongodemo');
// const d = m.model('question', m.Schema());
// console.log(await d.find()); 