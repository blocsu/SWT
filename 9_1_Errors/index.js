const [{Server: h1}, x] = [require('http'), require('express')];
const { default: e } = require('express');

let globalRes;
process.on('unhandledRejection', err => {
    globalRes.send('Серьёзная ошибка');
    console.log('ERR: ' + err.statusCode);
})

const Router = x.Router;
const PORT = 7777;
const {log} = console;
const hu = {'Content-type': 'text/html; charset=utf-8'}
const app = x();

const headerController = r => {
    const CORS = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PUT, OPTIONS",
        "Access-Control-Expose-Headers": "author, Access-Control-Expose-Headers",
        "author": "goss"
    };
    r.res.status(201).set(CORS).send('OK');
};

app
.use((r, rs, n) => rs.status(200).set(hu) && n())
.use(x.static('.'))
.all('/', (req, res, next) =>{
    if(req.query.error == 404) return next();
    if(req.query.error == 500) return next('Это фиаско!!');
    res.format({
        'application/json': () => res.json({message: 'Работает!'}),
        'text/html': () => res.send('<b>Работает!</b>')
    })
})
.get('/500_1', r => {
    try{
        r.res.send(qqq);
    }catch(e) {
        r.res.send('Пока нет данных!');
    }
})
.get('/500_2', r => r.res.status(0).send('Тоже ошибка...!'))
.get('/500_3', r => r.res.send(500))
.get('/500_4', r => {
    throw {statusCode: 406};
})
.get('/500_5', async (req, res, next) => {
    next({statusCode: 406});
})
.get('/500_6', async r => {
    globalRes = r.res;
    throw {statusCode: 406};
})
.get('/500_7', r => setTimeout(() => r.res.send(qqq)))
.put('/header', headerController)
.options('/header', headerController)
.use(({res: r}) => r.status(404).set(hu).send('Пока нет!'))
.use((err, req, res, next) => {
    console.log(err);// if(err.code == 'ERR_HTTP_INVALID_STATUS_CODE')
    if(err.statusCode == 406) return res.status(406).send({message: 'Ошибка согласования контента'})
    res.status(500).send('Ошибка');
})

module.exports = h1(app)
.listen(process.env.PORT || PORT, () => log(process.pid));