import express, {Application, Request, Response} from 'express';

const app: Application = express();
const PORT: number = 4322;

app.get('/', (req:Request, res:Response) => {
    res.send('Typed OK!');
});

app.listen(PORT);