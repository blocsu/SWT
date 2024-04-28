export default (express, bodyParser, createReadStream, crypto, http) => {
  const appSrc = express(); 
  const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS,PATCH',
    'Access-Control-Allow-Headers': 'x-test,Content-Type,Accept,Access-Control-Allow-Headers, x-author, ngrok-skip-browser-warning'
  };
     
  appSrc  
  .use(bodyParser.urlencoded({ extended: true }))  
  .get('/login/', (req, res) => {
    res
    .set({'Content-Type': 'text/plain; charset=utf-8', ...CORS})
    .send('dotsenkosar')
  })
  .get('/code/', (req, res) => {
    res
    .set({'Content-Type': 'text/plain; charset=utf-8', ...CORS})
    createReadStream(import.meta.url.substring(7)).pipe(res)
  })
  .get('/sha1/:input/', (req, res) => {
    res  
    .set({'Content-Type': 'text/plain; charset=utf-8', ...CORS})
    .send(crypto.createHash('sha1').update(req.params.input).digest('hex'))
  })    
  .all('/req/', async (req, res) => {      
      const addr = req.method == 'POST'? req.body.addr : req.query.addr;
      console.log(1);
      await http.get(addr || 'http://bloc.su', (r, b = '') => {        
        r
        .on('data', (c) => { b += c; })
        .on( 'end', () => res.set({'Content-Type': 'text/plain; charset=utf-8', ...CORS}).send(b));
      });            
  })
  .all('*', r => r.res.set({'Content-Type': 'text/plain; charset=utf-8', ...CORS}).send('dotsenkosar'));
  
  return appSrc;
} 