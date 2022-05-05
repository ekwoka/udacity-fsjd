import { Router, Request, Response } from 'express';
import { VerifyAuthToken } from '../middleware/verifyAuthToken';
import { ProductStore } from '../models';

const Products = Router();
const { index, get, create, update, remove } = ProductStore;

Products.get('/', async (req: Request, res: Response): Promise<void> => {
  const response = await index();
  res.json(response);
  return;
});

Products.get(
  '/:id',
  async ({ params }: Request, res: Response): Promise<void> => {
    const response = await get(Number(params.id));
    res.json(response);
    return;
  }
);

Products.post(
  '/',
  VerifyAuthToken,
  async (req: Request, res: Response): Promise<void> => {
    const response = await create(req.body);
    res.json(response);
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
    const response = await update(item);
    res.json(response);
    return;
  }
);

Products.delete(
  '/:id',
  VerifyAuthToken,
  async ({ params }: Request, res: Response): Promise<void> => {
    const response = await remove(Number(params.id));
    res.json(response);
    return;
  }
);

export { Products };
