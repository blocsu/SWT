const { Server } = require('./ws'); const ws = new Server({ port: 2222 });
const conns = new Map();
void ws.on('connection', sock => {
sock
.on('message', d => sock.send(d) || console.log(String(d)))
.on('close', () => conns.delete(sock));
 conns.set(sock, new Date().toLocaleString());
});
conns.forEach(x => console.log(x))