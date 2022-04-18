import express from 'express';
import { Images } from './routes/index.js';

const app = express();
const port = 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use('/images', Images);
