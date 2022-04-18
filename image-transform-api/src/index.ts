import express from 'express';
import { existsSync, promises as fs } from 'fs';
import { getPath, processImage } from './utils/index.js';

const app = express();
const port = 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

app.get('/', async ({ query }: { query: imageTransformParams }, res) => {
  const { fileName } = query;
  const [width, height] = [Number(query.width), Number(query.height)];
  try {
    if (!fileName) throw 'fileName is required';
    console.log(fileName);
    const [originalPath, cachedPath] = getPath(fileName, { width, height });
    if (!existsSync(originalPath)) throw 'File not found';
    if (existsSync(cachedPath)) {
      console.log('returning cached image');
      const file = await fs.readFile(cachedPath);
      res.status(200).contentType('image/jpeg').write(file);
      return;
    }

    const file = await fs.readFile(originalPath);
    if (!width && !height) {
      console.log('sending original image');
      res.status(200).contentType('image/jpeg').write(file);
      return;
    }
    console.log('processing new image');
    const result = await processImage(file, {
      width,
      height,
    });
    res.status(200).contentType('image/jpeg').write(result);
    console.log('caching new image');
    await fs.writeFile(cachedPath, result);
  } catch (e: any) {
    if (e.errno === -2) {
      res.status(404).send('File not found');
      return;
    }
    console.log(e);
    res.status(416).send(e as string);
  }
});

type imageTransformParams = {
  fileName: string;
  width: number;
  height: number;
};
