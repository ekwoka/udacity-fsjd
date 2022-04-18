import path from 'path';
import { fileURLToPath } from 'url';

export const getPath = (
  fileName: string,
  { width, height }: { width?: number; height?: number }
): [string, string] => {
  const originalPath = path.join(
    fileURLToPath(import.meta.url),
    '..',
    '..',
    'images',
    `${fileName}.jpg`
  );
  const cachedPath = path.join(
    fileURLToPath(import.meta.url),
    '..',
    '..',
    'images',
    'cache',
    `${fileName}${width || height ? `_${width || ''}x${height || ''}` : ''}.jpg`
  );
  return [originalPath, cachedPath];
};
