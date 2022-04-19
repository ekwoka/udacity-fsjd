import { NextFunction, Request, Response } from 'express';
import { brotli, deflate, gzip } from './utils/promises.js';

export const compression = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _send = res.send.bind(res);
  res.send = (buffer: Buffer): Response => {
    if (req.acceptsEncodings('br')) {
      res.set('Content-Encoding', 'br');
      brotli(buffer).then((compressed) => {
        _send(compressed);
      });
      return res;
    }
    if (req.acceptsEncodings('deflate')) {
      res.set('Content-Encoding', 'deflate');
      deflate(buffer).then((compressed) => {
        _send(compressed);
      });
      return res;
    }
    if (req.acceptsEncodings('gzip')) {
      res.set('Content-Encoding', 'gzip');
      gzip(buffer).then((compressed) => {
        _send(compressed);
      });
      return res;
    }

    _send(buffer);
    return res;
  };
  next();
};
