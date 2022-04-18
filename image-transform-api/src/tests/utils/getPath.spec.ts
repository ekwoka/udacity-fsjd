import { getPath } from '../../utils/getPath.js';

const fileName = 'test.jpg';
const width = 100;
const height = 100;

describe('Getting File Paths', () => {
  it('should return the original images path', () => {
    const [originalPath] = getPath(fileName, {});
    expect(originalPath).toContain(`/images/${fileName}`);
  });

  it('should return a cached image path', () => {
    const [, cachedPath] = getPath(fileName, { width, height });
    expect(cachedPath).toContain(`/images/cache/${fileName}`);
  });

  it('should properly format cached filenames', () => {
    const [, cachedPath] = getPath(fileName, { width, height });
    expect(cachedPath).toContain(`${fileName}_${width}x${height}.jpg`);
  });

  it('should properly format cached filenames without width', () => {
    const [, cachedPath] = getPath(fileName, { height });
    expect(cachedPath).toContain(`${fileName}_x${height}.jpg`);
  });

  it('should properly format cached filenames without height', () => {
    const [, cachedPath] = getPath(fileName, { width });
    expect(cachedPath).toContain(`${fileName}_${width}x.jpg`);
  });

  it('ignores values of 0 for width and height', () => {
    const [, cachedPath] = getPath(fileName, { width: 0, height: 0 });
    expect(cachedPath).toContain(`${fileName}.jpg`);
  });
});
