import { processImage } from '../../utils/processImage.js';
import sizeOf from 'image-size';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const filePath = path.join(
  fileURLToPath(import.meta.url),
  '..',
  '..',
  '..',
  'images',
  `icelandwaterfall.jpg`
);

const width = 300;
const height = 200;

describe('Squoosh Image Processor', () => {
  let file: Buffer | undefined = undefined;
  beforeAll(async () => {
    file = await readFile(filePath);
  });

  describe('Test Suite', () => {
    it('loads the file', () => {
      expect(file).toBeTruthy();
    });

    it('can get the file dimensions', () => {
      expect(sizeOf(file as Buffer).width).toBeDefined();
    });
  });

  it('resizes images properly', async () => {
    const buffer = await processImage(file as Buffer, { width, height });
    const size = sizeOf(Buffer.from(buffer.buffer));
    const test = size.width === width && size.height === height;
    expect(test).toBeTrue();
  });

  it('maintains aspect ratio when resizing by height', async () => {
    const origSize: any = sizeOf(file as Buffer);
    const buffer = await processImage(file as Buffer, { height });
    const outputSize: any = sizeOf(Buffer.from(buffer.buffer));
    expect(outputSize.width / outputSize.height).toBeCloseTo(
      origSize.width / origSize.height,
      1
    );
  });

  it('maintains aspect ratio when resizing by width', async () => {
    const origSize: any = sizeOf(file as Buffer);
    const buffer = await processImage(file as Buffer, { width });
    const outputSize: any = sizeOf(Buffer.from(buffer.buffer));
    expect(outputSize.width / outputSize.height).toBeCloseTo(
      origSize.width / origSize.height,
      1
    );
  });
});
