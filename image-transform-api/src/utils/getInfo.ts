import sizeOf from 'image-size';

export const getRatio = (buffer: Buffer): number => {
  const { width, height } = getSize(buffer);
  return width / height;
};

export const getSize = (buffer: Buffer): { width: number; height: number } => {
  const { width, height } = sizeOf(buffer) as unknown as {
    width: number;
    height: number;
  };
  return { width, height };
};

export const getType = (buffer: Buffer): string => {
  const { type } = sizeOf(buffer) as unknown as { type: string };
  return type;
};
