export default (express, bodyParser, createReadStream, crypto, http, CORS, User, UserController, cookieParser) => {
  const appSrc = express();
  const users = new Set(); 
       
  appSrc
  .use(cookieParser())
  .use((r, res, next) => r.res.set(CORS) && next())
  .use(bodyParser.urlencoded({ extended: true }))  
  .get('/login/', (req, res) => res.send('dotsenkosar'))
  .use('/user/', UserController(express, User))  
  .get('/code/', (req, res) => createReadStream(import.meta.url.substring(7)).pipe(res))
  .get('/sha1/:input/', (req, res) => {
    res  
    .set({'Content-Type': 'text/plain; charset=utf-8', ...CORS})
    .send(crypto.createHash('sha1').update(req.params.input).digest('hex'))
  })    
  .all('/req/', async (req, res) => {      
      const addr = req.method == 'POST'? req.body.addr : req.query.addr;      
      await http.get(addr || 'http://bloc.su', (r, b = '') => {        
        r
        .on('data', (c) => { b += c; })
        .on( 'end', () => res.send(b));
      });            
  })
  .get('/simpleform', (req, res) => createReadStream('./simpleform.html').pipe(res))
  .get('/profile/', r => {
    const {user} = r.cookies;
    r.res.send(users.has(user) ? `Вы нашлись, ${user}!` : 'Вас не удалось найти!');
  })
  .get('/prune/', r => {    
    const cookieHead = {'Set-Cookie': `user=.;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`};
    r.res.set(cookieHead).send(`Очищено!`);
  }) 
  .get('/set/:user', r => {
    const {user} = r.params;
    const cookieHead = {'Set-Cookie': `user=${user};path=/;max-age=60`};
    users.add(user);
    r.res.set(cookieHead).send(`Установлено: ${user}`);
  })  
  .all('*', r => r.res.send('dotsenkosar'));
  
  return appSrc;
} 