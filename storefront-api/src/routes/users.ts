import { Request, Response, Router } from 'express';
import { LoginDetails, UserCreate, UserStore } from '../models';

const Users = Router();

const { authenticate, create } = UserStore;

Users.post(
  '/register',
  async ({ body }: Request, res: Response): Promise<void> => {
    try {
      if (
        !body.email ||
        !body.first_name ||
        !body.last_name ||
        !body.role ||
        !body.password
      )
        throw 'Missing fields';
      const token = await create(body as UserCreate);
      if (!token) throw 'Failed to create user';
      res.json({ token });
    } catch (e) {
      res.status(400).json({ error: e });
      return;
    }
    return;
  }
);

Users.post(
  '/authenticate',
  async ({ body }: Request, res: Response): Promise<void> => {
    try {
      if (!body.email || !body.password) throw 'Missing email or password';
      const token = await authenticate(body as LoginDetails);
      if (!token) throw 'Invalid email or password';
      res.json({ token });
    } catch (e) {
      res.status(401).json({
        error: e,
      });
      return;
    }
    return;
  }
);

export { Users };
