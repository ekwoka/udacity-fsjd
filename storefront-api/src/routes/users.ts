import { Request, Response, Router } from 'express';
import { UserStore } from '../models';

const Users = Router();

const { authenticate, create } = UserStore;

Users.post(
  '/register',
  async ({ body }: Request, res: Response): Promise<void> => {
    const { email, username, password } = body;
    try {
      if (!email || !username || !password) throw 'Missing fields';
      const token = await create({ email, username, password });
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
      const response = await authenticate(body);
      if (!response) throw 'Invalid email or password';
      res.json({ token: response });
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
