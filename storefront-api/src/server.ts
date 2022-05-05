import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import { Products, Users, Orders, Services } from './routes';

const app: express.Application = express();
const address = '0.0.0.0:3000';
const corsOptions: CorsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use([bodyParser.json(), cors(corsOptions)]);

app.use('/products', Products);
app.use('/users', Users);
app.use('/orders', Orders);
app.use('/services', Services);

app.get('/', function (req: Request, res: Response) {
  console.log('Responding...');
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export { app };
