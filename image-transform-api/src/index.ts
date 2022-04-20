import express from 'express';
import { Images } from './routes/index.js';
import { compression } from './middleware/compression.js';

const app = express();
const port = 3000;

app.listen(port, (): void => console.log(`Server is running on port ${port}`));

app.use(compression);
app.use('/images', Images);

export { app };
