const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = 7777;

app
.use(bodyParser.urlencoded({extended: true}))

.all('/bodyParser', (req, res) => {
    const response = {
        method: req.method,
        body: req.body?.name,
        info: 'Спасибо за ваш ПОСТ'
    }
    res.json(response);
})
.all('*', (req, res) => {
    res.format({
        'text/html': () => res.send('Работает согласование'),
        'application/json': () => res.json({Result: 'Работает согласование!'})
    });
})
.listen(PORT);
