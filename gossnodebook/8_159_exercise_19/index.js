import { Server } from 'http';
import { Server as Sio } from 'socket.io';
import x from 'express';

const app = x();
app.get('/', r => r.res.send('Hello!'));

app.get('/chat', r => r.res.sendFile(`chat.html`, { root: '.' }));


const sss = Server(app);

const io = new Sio(sss);

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('chat', msg => {  
     console.log('message: '+ msg);
    io.emit('chat', msg);
  });
});
sss.listen(4326);
