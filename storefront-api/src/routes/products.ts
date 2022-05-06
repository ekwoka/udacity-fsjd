import { Router, Request, Response } from 'express';
import { VerifyAuthToken } from '../middleware/verifyAuthToken';
import { ProductStore } from '../models';

const Products = Router();
const { index, get, create, update, remove } = ProductStore;

Products.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await index();
    res.json(response);
  } catch (e) {
    console.log(e);
    res.status(401).json({ error: e });
  }
  return;
});

Products.get(
  '/:id',
  async ({ params }: Request, res: Response): Promise<void> => {
    try {
      const response = await get(Number(params.id));
      res.json(response);
    } catch (e) {
      console.log(e);
      res.status(401).json({ error: e });
    }
    return;
  }
);

Products.post(
  '/',
  VerifyAuthToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await create(req.body);
      res.json(response);
    } catch (e) {
      console.log(e);
      res.status(401).json({ error: e });
    }
    return;
  }
);

Products.put(
  '/:id',
  VerifyAuthToken,
  async ({ params, body }: Request, res: Response): Promise<void> => {
    const item = {
      ...body,
      id: Number(params.id),
    };
    try {
      const response = await update(item);
      res.json(response);
    } catch (e) {
      console.log(e);
      res.status(401).json({ error: e });
    }
    return;
  }
);

Products.delete(
  '/:id',
  VerifyAuthToken,
  async ({ params }: Request, res: Response): Promise<void> => {
    try {
      const response = await remove(Number(params.id));
      res.json(response);
    } catch (e) {
      console.log(e);
      res.status(401).json({ error: e });
    }
    return;
  }
);

export { Products };
