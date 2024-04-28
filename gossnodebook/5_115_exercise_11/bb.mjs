import x from 'express';
import Busboy from 'busboy';
import { createWriteStream as c } from 'node:fs';
const app = x();
app.use(x.static('.'));
app.post('/', r => {
    const busboy = Busboy({ headers: r.headers });
    console.log(r.headers);
    busboy
        .on('file', (_, file) => {
            console.log(file);
            const tmp = `${Math.random()}.png`;
            file
                .pipe(c(tmp))
                .on('finish', () => {
                    r.res.send(`<a href="${tmp}">Ваш файл</a>`)
                });
        })
        .on('error', e => rs.end('ERROR boy'));
    r.pipe(busboy);
});
app.listen(4325);