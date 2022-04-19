import { Request, Response, Router } from 'express';
import { existsSync, promises as fs } from 'fs';
import { getPath, processImage } from '../utils/index.js';

const Images = Router();

Images.get('/*.jpg', async (req: Request, res: Response) => {
  const { path, query } = req;
  const [width, height] = [Number(query.width), Number(query.height)];
  const webp = !!req.accepts('image/webp');
  try {
    if (!path.includes('.')) throw 'file does not exist';
    const [originalPath, cachedPath] = getPath(path, { width, height }, webp);
    if (!existsSync(originalPath)) throw 'File not found';
    if (existsSync(cachedPath)) {
      const file = await fs.readFile(cachedPath);
      res
        .status(200)
        .contentType(`image/${webp ? 'webp' : 'jpg'}`)
        .send(file);
      return;
    }

    const file = await fs.readFile(originalPath);
    if (!width && !height && !webp) {
      res
        .status(200)
        .contentType(`image/${webp ? 'webp' : 'jpg'}`)
        .send(file);
      return;
    }

    const result = await processImage(
      file,
      {
        width,
        height,
      },
      webp
    );
    res
      .status(200)
      .contentType(`image/${webp ? 'webp' : 'jpg'}`)
      .send(result);

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

export { Images };
