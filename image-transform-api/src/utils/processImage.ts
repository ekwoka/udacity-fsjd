// @ts-ignore
import { ImagePool } from '@squoosh/lib';
import { cpus } from 'os';

const encodeOptions = {
  mozjpeg: 'auto',
};

export const processImage = async (
  file: Buffer,
  options: { width?: number; height?: number }
) => {
  const pool = new ImagePool(cpus().length);
  const image = pool.ingestImage(file);
  if (options.width || options.height) {
    const preprocessOptions = {
      resize: options,
    };
    await image.preprocess(preprocessOptions);
  }
  await image.encode(encodeOptions);
  await pool.close();
  const result = await image.encodedWith.mozjpeg;
  return result.binary;
};
