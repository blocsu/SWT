export default (express, bodyParser, createReadStream, crypto, http, CORS, m, mstore, session) => {
  const appSrc = express();
  const db = m.connection;
  const MongoStore = mstore(session);
  //const users = new Set();
  const protect = (r, res, next) => {    
    if (r.session.name === 'admin') return next();
    res.redirect('/denied/');
  }; 
       
  appSrc  
  .use((r, res, next) => r.res.set(CORS) && next())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: db})
  }))  
  .get('/login/', (req, res) => res.send('dotsenkosar'))   
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
  .get('/denied/', r => r.res.status(403).send('Доступ запрещён!'))
  .get('/prune/', r => {    
    delete r.session.name;
    r.res.send(`Очищено!`);
  }) 
  .get('/profile', protect, r => {
    const { name } = r.session;
    r.res.send(`Доступ открыт, ${name}!`);
})
  .get('/set/:user', r => {
    const {user} = r.params;
    r.session = r.session || {};
    r.session.name = user;
    r.res.send(`Установлено: ${user}!`);
  })  
  .all('*', r => r.res.send('dotsenkosar'));
  
  return appSrc;
} 