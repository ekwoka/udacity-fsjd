import {
  brotliCompress,
  gzip as gzipCompress,
  deflate as deflateCompress,
} from 'zlib';

const promisify = <T>(
  fn: (arg: T, cb: (err: any, result: T) => void) => void
): ((arg: T) => Promise<T>) => {
  return (arg: T): Promise<T> => {
    return new Promise((res, rej): void => {
      fn(arg, (err: any, result: T): void => {
        if (err) rej(err);
        res(result);
      });
    });
  };
};

export const brotli = promisify<Buffer>(brotliCompress);

export const gzip = promisify<Buffer>(gzipCompress);

export const deflate = promisify<Buffer>(deflateCompress);
