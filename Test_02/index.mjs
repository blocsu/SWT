// require('/Users/lodash.js');

// import { f } from 'mypack29072022';
// console.log(f('hello world'));
import { connect } from 'node:net';
connect(80, '151.248.115.32')
.on('data', x => console.log(String(x)))
.write(`POST
/api/req/%D0%98%D0%BB%D1%8C%D1%8F/%D0%93%D0%BE%D1%81%D
1%81 HTTP/1.1
Host:kodaktor.ru
Content-Type:application/x-www-form-urlencoded
Content-Length:65
name=%D0%98%D0%BB%D1%8C%D1%8F&familyname=%D0%93%D0
%BE%D1%81%D1%81`);