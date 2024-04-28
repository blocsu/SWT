const x = require('express');
const app = x();

app
.all('/*', (req, res) => res
.status(200)
.set({"Content-Type": "application/json; charset=utf-8"})
.end('{"Привет": "мир!"}')
)
.listen(4321);

/*
https://kodaktor.ru/x0
https://kodaktor.ru/g/runkit


в REPL
void require('express')().all('/*', r => r.res.send(r.url)).listen(4321);
*/