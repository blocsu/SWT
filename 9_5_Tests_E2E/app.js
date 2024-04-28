export default (express, bodyParser, fs, crypto, CORS, User, UserController, puppeteer) => {
    const app = express();
    
    app
    .use((r, res, next) => r.res.set(CORS) && next())
    .use(bodyParser.urlencoded({ extended: true }))
    .use('/user', UserController(express, User))
    .get('/login/', (req, res) => res.send('dotsenkosar'))
    .get('/sha1/:input/', (req, res) => {
        res  
        .set({'Content-Type': 'text/plain; charset=utf-8', ...CORS})
        const shasum = crypto.createHash('sha1');
        shasum.update(req.params.input);
        req.res.send(shasum.digest('hex'));
    })
    .get('/sha1test/:input/', async (r, res) => {
        res  
        .set({'Content-Type': 'text/plain; charset=utf-8', ...CORS})
        const shasum = crypto.createHash('sha1');
        shasum.update(r.params.input);
        const URL = 'https://kodaktor.ru/g/bb4613b';
        const browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser', headless: true, args: ['--no-sandbox']});
        const page = await browser.newPage();
        await page.goto(URL);
        await page.waitForSelector('#inp');
        const x = 'hello';
        page.evaluate(x => document.querySelector('#inp').value = x, x);
        await page.waitForSelector('#bt');
        await page.click('#bt');
        const got = await page.$eval('#inp', el => el.value);
        browser.close();
        r.res.json({real: shasum.digest('hex'), got})
    })
    .get('/blocking/', r => {
        ((y = 15000, x = Date.now()) => { while (Date.now() - x < y) ;})();
        r.res.send(String(process.pid));
    }) 
    .get('/pid/', r => r.res.send(String(process.pid))) 
    .get('/code/', (req, res) => fs.createReadStream(import.meta.url.substring(7)).pipe(res))
    .all('/*', r => r.res.send('Работает!'))
    .set('view engine', 'pug');
   
   
    return app;

}