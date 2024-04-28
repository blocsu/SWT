/* Практическое задание 3:
Создайте и сделайте доступным для обращения веб-ресурс, который по протоколу HTTPS возвращает по маршруту /login/ следующий текст: dotsenkosar

При этом для всех маршрутов заголовок Access-Control-Allow-Origin должен иметь значение "*"
По маршруту /promise/ ваш веб-ресурс должен возвращать в простом текстовом формате (не должно быть тегов, чистый текст кода на JavaScript) код функции task от одного аргумента x,
т.е. function task(x){ return ... }
которая возвращает промис, разрешённый в значение yes, если x < 18, и отвергающий с причиной no в противном случае.

По маршруту /fetch/ должна располагаться (выдаваться клиенту) веб-страница (text/html; charset=UTF-8).
К ней предъявляются следующие требования:
А. Должна содержать одно поле ввода input с идентификатором (id) inp
Б. Должна содержать одну кнопку button с идентификатором (id) bt
В. При щелчке по этой кнопке сценарий на этой странице должен с помощью fetch обратиться к адресу, который к моменту щелчка введён в поле ввода (адрес будет вводить автоматический тестер)
Г. Получив результат, возвращённый этим адресом, сценарий должен поместить этот результат в поле inp вместо того значения, что в нём было ранее.
Д. Страница не должна содержать элемент form.

Примечание 1. При использовании метода fetch нужно преобразовать Response с помощью метода text().
Примечание 2. Пожалуйста, отправляйте на проверку корневой маршрут, например https://myweek3work.herokuapp.com/ */

const { Server } = require('http');
const { createReadStream: cRS, writeFileSync: wFS, readFileSync: rFS } = require('fs');
const finalhandler = require('finalhandler');
const { text } = require('stream/consumers');
const serve = require('serve-static')('.');

wFS('name.txt', 'https://bloc.su/');
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,DELETE',
  'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
};
const s = Server((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'X-Author': 'dotsenkosar', ...CORS });
    res.write('dotsenkosar\n');
  } else if (req.url === '/login/') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', ...CORS });
    res.write('dotsenkosar\n');
  } else if (req.url.startsWith('/timer')) {
    const secs = req.url.substring(1 + req.url.indexOf('?'));
    return setTimeout(() => res.end(`<h1><i>Seconds: ${secs}</i></h1>\n`), secs);
  } else if (req.url.startsWith('/sample/')) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', ...CORS });
    const s = function task(x) { return x * this ** 2 };
    return res.end(`${s}`);
  } else if (req.url === '/download') {
    res.writeHead(200, { 'Content-Disposition': 'attachment; filename="file.txt"', ...CORS });
    res.write('File\n');
  } else if (req.url.startsWith('/promise/')) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', ...CORS });
    const x = req.url.substring(1 + req.url.indexOf('?'));
    const pr = function task(x) { return new Promise((res, rej) => x < 18 ? res('yes') : rej('no')) };
    pr(x).then(x => console.log(x)).catch(err => console.log(err));
    return res.end(`${pr}`);
  } else if (req.url.startsWith('/fetch/')) {
    return cRS('fetch.html').pipe(res);

  } else if (req.url === '/name.txt') {
    return cRS('name.txt').pipe(res);
  } else {
    return serve(req, res, finalhandler(req, res));
  }
  res.end();
});
s.listen(4321);