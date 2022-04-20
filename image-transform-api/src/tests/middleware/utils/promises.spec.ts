import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { brotli, deflate, gzip } from '../../../middleware/utils/promises.js';

const filePath = path.join(fileURLToPath(import.meta.url));

describe('Compression Works', (): void => {
  let file: Buffer = undefined as unknown as Buffer;
  beforeAll(async (): Promise<void> => {
    file = await readFile(filePath);
  });

  describe('Test Suite', (): void => {
    it('loads the file', (): void => {
      expect(file).toBeTruthy();
    });
  });

  it('compresses with brotli', async (): Promise<void> => {
    const compressed = await brotli(file);
    expect(compressed.length).toBeLessThan(file.length);
  });

  it('compresses with gzip', async (): Promise<void> => {
    const compressed = await gzip(file);
    expect(compressed.length).toBeLessThan(file.length);
  });

  it('compresses with deflate', async (): Promise<void> => {
    const compressed = await deflate(file);
    expect(compressed.length).toBeLessThan(file.length);
  });
});
