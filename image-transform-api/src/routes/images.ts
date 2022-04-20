import { Request, Response, Router } from 'express';
import { existsSync, promises as fs } from 'fs';
import { getPath, processImage } from '../utils/index.js';

const Images = Router();

Images.get('/*.jpg', async (req: Request, res: Response): Promise<void> => {
  const { path, query } = req;
  const [width, height] = [Number(query.width), Number(query.height)];
  const webp = !!req.accepts('image/webp');
  try {
    const [originalPath, cachedPath] = getPath(path, { width, height }, webp);
    if (!existsSync(originalPath))
      throw { status: 404, message: 'Requested File does not exist' };
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
    res.status(e.status).contentType('application/json').send(e.message);
  }
});

Images.get('/*', (_, res): void => {
  res
    .status(404)
    .contentType('application/json')
    .send('Requested path is not an image file. Check path for file-extension');
});

export { Images };
