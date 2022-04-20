import { getPath } from '../../utils/getPath.js';

const width = 100;
const height = 100;

describe('Getting File Paths', (): void => {
  it('should return the original images path', (): void => {
    const [originalPath] = getPath('test.jpg', {});
    expect(originalPath).toContain('/images/test.jpg');
  });

  it('should return a cached image path', (): void => {
    const [, cachedPath] = getPath('test.jpg', { width, height });
    expect(cachedPath).toContain('/images/cache/test');
  });

  it('should properly format cached filenames', (): void => {
    const [, cachedPath] = getPath('test.jpg', { width, height });
    expect(cachedPath).toContain(`test_${width}x${height}.jpg`);
  });

  it('should properly format cached filenames without width', (): void => {
    const [, cachedPath] = getPath('test.jpg', { height });
    expect(cachedPath).toContain(`test_x${height}.jpg`);
  });

  it('should properly format cached filenames without height', (): void => {
    const [, cachedPath] = getPath('test.jpg', { width });
    expect(cachedPath).toContain(`test_${width}x.jpg`);
  });

  it('ignores values of 0 for width and height', (): void => {
    const [, cachedPath] = getPath('test.jpg', { width: 0, height: 0 });
    expect(cachedPath).toContain('test.jpg');
  });

  it('returns webp path when supported', (): void => {
    const [, cachedPath] = getPath('test.jpg', { width, height }, true);
    expect(cachedPath).toContain('webp');
  });

  it('returns jpg path when webp not supported', (): void => {
    const [, cachedPath] = getPath('test.jpg', { width, height }, false);
    expect(cachedPath).toContain('jpg');
  });
});
