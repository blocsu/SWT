const s = require('ws').Server;
const clients = [];
                 
const base = require('path').dirname(process.argv[1]);
const { wsend } = require(base + '/quit.json');   

require('fs').writeFileSync(base + '/socks.txt', (new Date()).toLocaleString('ru-RU', { timeZone: 'UTC' }));
                 
(new s({
  port: 3333
}))
 .on('connection', ws => {             
                 
   let id = Math.random();
   clients[id] = ws;
   ws
    .on('message', message => {
      Object.values(clients).forEach(client => client.send(message));
      if (message === wsend) {
        process.nextTick(() => {throw new Error('Quitting!');} );
      }
   })
    .on('close', () => {
      delete clients[id];
   });
});


/*
const s = require('ws').Server;
const clients = [];

const base = require('path').dirname(process.argv[1]);
const { wsend } = require(base + '/quit.json');

const fs = require('fs');


fs.writeFileSync(base + '/socks.txt', (new Date()).toLocaleString('ru-RU', { timeZone: 'UTC' }));

const server = require('https').createServer({
    key: fs.readFileSync( '/etc/letsencrypt/live/kodaktor.ru-0003/privkey.pem'),
    cert: fs.readFileSync( '/etc/letsencrypt/live/kodaktor.ru-0003/fullchain.pem')
}, (req, res) => res.end('this is for websockets'));

(new s({ server }))
 .on('connection', ws => {

   let id = Math.random();
   clients[id] = ws;
   ws
    .on('message', message => {
      Object.values(clients).forEach(client => client.send(message));
      if (message === wsend) {
        process.nextTick(() => {throw new Error('Quitting!');} );
      }
   })
    .on('close', () => {
      delete clients[id];
   });
});

server.listen(3333);
*/


