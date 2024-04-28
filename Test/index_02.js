import connect from 'node:net'

//=====================do not work=================================
//void net.connect(80, '151.248.115.32').on('data', x => console.log(String(x))).write('POST/api/req/%D0%98%D0%BB%D1%8C%D1%8F/%D0%93%D0%BE%D1%81%D1%81 HTTP/1.1\nHost:kodaktor.ru\nContent-Type:application/x-www-formurlencoded\nContent-Length:65\n\nname=%D0%98%D0%BB%D1%8C%D1%8F&familyname=%D0%93%D0%BE%D1%81%D1%81');
//==================================================================

// connect(80, '151.248.115.32')
// .on('data', x => console.log(String(x)))
// .write(`POST/api/req/%D0%98%D0%BB%D1%8C%D1%8F/%D0%93%D0%BE%D1%81%D1%81 HTTP/1.1
// Host:kodaktor.ru
// Content-Type:application/x-www-form-urlencoded
// Content-Length:65
// name=%D0%98%D0%BB%D1%8C%D1%8F&familyname=%D0%93%D0%BE%D1%81%D1%81`);

//=============каманды в node REPL=========================
net.Server(sock => sock.end('hello')).listen(1234); //curl localhost:1234 --http0.9
void net.connect(1234, 'localhost').on('data', x => console.log(String(x))).end();
net.Server(sock => sock.end('HTTP/1.1 200\n\nhello')).listen(1234);//отвечает на запрос в браузере
//=========================================================