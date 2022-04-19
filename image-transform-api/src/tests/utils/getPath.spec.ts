import { getPath } from '../../utils/getPath.js';

const width = 100;
const height = 100;

describe('Getting File Paths', () => {
  it('should return the original images path', () => {
    const [originalPath] = getPath('test.jpg', {});
    expect(originalPath).toContain('/images/test.jpg');
  });

  it('should return a cached image path', () => {
    const [, cachedPath] = getPath('test.jpg', { width, height });
    expect(cachedPath).toContain('/images/cache/test');
  });

  it('should properly format cached filenames', () => {
    const [, cachedPath] = getPath('test.jpg', { width, height });
    expect(cachedPath).toContain(`test_${width}x${height}.jpg`);
  });

  it('should properly format cached filenames without width', () => {
    const [, cachedPath] = getPath('test.jpg', { height });
    expect(cachedPath).toContain(`test_x${height}.jpg`);
  });

  it('should properly format cached filenames without height', () => {
    const [, cachedPath] = getPath('test.jpg', { width });
    expect(cachedPath).toContain(`test_${width}x.jpg`);
  });

  it('ignores values of 0 for width and height', () => {
    const [, cachedPath] = getPath('test.jpg', { width: 0, height: 0 });
    expect(cachedPath).toContain('test.jpg');
  });

  it('returns webp path when supported', () => {
    const [, cachedPath] = getPath('test.jpg', { width, height }, true);
    expect(cachedPath).toContain('webp');
  });

  it('returns jpg path when webp not supported', () => {
    const [, cachedPath] = getPath('test.jpg', { width, height }, false);
    expect(cachedPath).toContain('jpg');
  });
});
