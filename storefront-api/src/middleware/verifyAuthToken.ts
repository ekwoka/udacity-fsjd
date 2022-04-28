import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../utils';

export const VerifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization;
    if (!token) throw 'Missing token';
    const decoded = await verifyJWT(token.split(' ')[1]);
    if (!decoded) throw 'Invalid token';
    res.locals.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ error: e });
    return;
  }
};
