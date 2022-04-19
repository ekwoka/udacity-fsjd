import { NextFunction, Request, Response } from 'express';
import { brotli, deflate, gzip } from './utils/promises.js';

export const compression = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _send = res.send.bind(res);
  res.send = (buffer: Buffer): Response => {
    console.log('checking compression support');
    if (req.acceptsEncodings('br')) {
      console.log('compressing w/ brotli');
      res.set('Content-Encoding', 'br');
      brotli(buffer).then((compressed) => {
        _send(compressed);
      });
      return res;
    }
    if (req.acceptsEncodings('deflate')) {
      console.log('compressing w/ deflate');
      res.set('Content-Encoding', 'deflate');
      deflate(buffer).then((compressed) => {
        _send(compressed);
      });
      return res;
    }
    if (req.acceptsEncodings('gzip')) {
      console.log('compressing w/ gzip');
      res.set('Content-Encoding', 'gzip');
      gzip(buffer).then((compressed) => {
        _send(compressed);
      });
      return res;
    }

    console.log('skipping compression');
    _send(buffer);
    return res;
  };
  next();
};
