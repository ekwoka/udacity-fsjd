import { Request, Response, Router } from 'express';
import { VerifyAuthToken } from '../middleware/verifyAuthToken';
import { LoginDetails, UserCreate, UserStore } from '../models';

const Users = Router();
Users.post('/register', registerUser);
Users.post('/authenticate', authenticateUser);
Users.get('/', VerifyAuthToken, indexUsers);
Users.get('/:id', VerifyAuthToken, getUser);

export { Users };

const { authenticate, create, get, index } = UserStore;

async function registerUser({ body }: Request, res: Response): Promise<void> {
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
async function authenticateUser(
  { body }: Request,
  res: Response
): Promise<void> {
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

async function indexUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await index();
    if (!users) throw 'Whoops!';
    res.json(users);
  } catch (e) {
    res.status(401).json({
      error: e,
    });
    return;
  }
  return;
}

async function getUser({ params }: Request, res: Response): Promise<void> {
  try {
    const user = await get(Number(params.id));
    if (!user) throw 'Invalid email or password';
    res.json(user);
  } catch (e) {
    res.status(401).json({
      error: e,
    });
    return;
  }
  return;
}
