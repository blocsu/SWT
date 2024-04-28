const [{ Server: h1 }, x] = [require('http'), require('express')];
const bodyParser = require('body-parser');

const Router = x.Router();
const PORT = 4324;
const app = x();
let serv;
Router
  .route('/')
  .get(r => r.res.send(process.cwd() + ' ::: ' + __dirname))
  .post(r => { 
       r.res.send('Готово! <a href="/im.png">вот текущая картинка на сервере</a>');
       const src = r.body.b64Im;
       const j = src.indexOf('base64,');
       const im = Buffer.from(src.slice(j + 7), 'base64');
       require('fs').writeFileSync(process.cwd() + '/im.png', im);      
   } );
app
  .use(bodyParser.urlencoded({ extended: true, limit: '50mb' })) 
  .use(x.static('.'))
  .use('/', Router)
  .use(({ res: r }) => r.status(404).send('Пока нет!'))
  .use((e, r, rs, n) => rs.status(500).send(`Ошибка: ${e}!`))
  .set('x-powered-by', false);
module.exports = serv = h1(app)
  .listen(process.env.PORT ?? PORT, 
          () => console.log(process.pid + ' ' + process.env.PORT ?? PORT)
  );