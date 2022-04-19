import { processImage, getRatio, getSize } from '../../utils/index.js';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { getType } from '../../utils/getInfo.js';

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
  let file: Buffer = undefined as unknown as Buffer;
  beforeAll(async () => {
    file = await readFile(filePath);
  });

  describe('Test Suite', () => {
    it('loads the file', () => {
      expect(file).toBeTruthy();
    });
  });

  describe('Image information handler', () => {
    it('gets the image size', () => {
      const { width, height } = getSize(file);
      expect(width).toBeGreaterThan(0);
      expect(height).toBeGreaterThan(0);
    });

    it('gets the image ratio', () => {
      const ratio = getRatio(file);
      expect(ratio).toBeGreaterThan(0);
    });
  });

  it('resizes images properly', async () => {
    const processed = await processImage(file as Buffer, { width, height });
    const size = getSize(processed);
    expect(size.width).toBe(width);
    expect(size.height).toBe(height);
  });

  it('maintains aspect ratio when resizing by height', async () => {
    const processed = await processImage(file as Buffer, { width: 0, height });
    const [outputRatio, originalRatio] = [getRatio(processed), getRatio(file)];
    expect(outputRatio).toBeCloseTo(originalRatio, 1);
  });

  it('maintains aspect ratio when resizing by width', async () => {
    const processed = await processImage(file as Buffer, { width, height: 0 });
    const [outputRatio, originalRatio] = [getRatio(processed), getRatio(file)];
    expect(outputRatio).toBeCloseTo(originalRatio, 1);
  });

  describe('Supports filetypes', () => {
    it('jpg', async () => {
      const processed = await processImage(
        file as Buffer,
        { width, height },
        false
      );
      const type = getType(processed);
      expect(type).toBe('jpg');
    });

    it('webp', async () => {
      const processed = await processImage(
        file as Buffer,
        {
          width,
          height,
        },
        true
      );
      const type = getType(processed);
      expect(type).toBe('webp');
    });
  });

  describe('Handles illegal values correctly', () => {
    it('limits negative height', async () => {
      const processed = await processImage(file as Buffer, {
        width,
        height: -1,
      });
      const [outputRatio, originalRatio] = [
        getRatio(processed),
        getRatio(file),
      ];
      expect(outputRatio).toBeCloseTo(originalRatio, 1);
    });

    it('limits negative width', async () => {
      const processed = await processImage(file as Buffer, {
        width: -1,
        height,
      });
      const [outputRatio, originalRatio] = [
        getRatio(processed),
        getRatio(file),
      ];
      expect(outputRatio).toBeCloseTo(originalRatio, 1);
    });

    it('ignores infinity', async () => {
      const processed = await processImage(file as Buffer, {
        width: 300,
        height: Infinity,
      });
      const [outputRatio, originalRatio] = [
        getRatio(processed),
        getRatio(file),
      ];
      expect(outputRatio).toBeCloseTo(originalRatio, 1);
    });

    it('limits sizes to the original size', async () => {
      const processed = await processImage(file as Buffer, {
        width: 10000,
        height: 10000,
      });
      const [outputRatio, originalRatio] = [
        getRatio(processed),
        getRatio(file),
      ];
      expect(outputRatio).toBeCloseTo(originalRatio, 1);
    });
  });
});
