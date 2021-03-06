// @ts-ignore
import { ImagePool } from '@squoosh/lib';
import { getSize } from './getInfo.js';

const encodeOptions = {
  jpg: {
    mozjpeg: 'auto',
  },
  webp: {
    webp: 'auto',
  },
};

export const processImage = async (
  file: Buffer,
  options: { width: number; height: number; [key: string]: any },
  webp?: boolean
): Promise<Buffer> => {
  const orig = getSize(file) as { [key: string]: any };
  ['width', 'height'].forEach((key): void => {
    const value = Number(options[key]);
    options[key] =
      value <= 0 || value === Infinity || isNaN(value)
        ? 0
        : value >= orig[key]
        ? orig[key]
        : value;
  });
  if (options.width === orig.width && options.height === orig.height) {
    return file;
  }
  const pool = new ImagePool(2);
  const image = pool.ingestImage(file);
  if (options.width || options.height) {
    const preprocessOptions: {
      resize: { width: number; height: number; fitMethod: string };
    } = {
      resize: { ...options, fitMethod: 'contain' }, // seems @squoosh/lib doesn't yet support fitMethod
    };
    await image.preprocess(preprocessOptions);
  }
  await image.encode(webp ? encodeOptions.webp : encodeOptions.jpg);
  await pool.close();

  const result = webp
    ? await image.encodedWith.webp
    : await image.encodedWith.mozjpeg;
  return Buffer.from(result.binary.buffer);
};
