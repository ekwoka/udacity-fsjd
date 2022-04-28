import { Router, Request, Response } from 'express';
import { ItemStore } from '../models/items';

const Items = Router();
const { index, get, create, update, remove } = ItemStore;

Items.get('/', async (req: Request, res: Response): Promise<void> => {
  const response = await index();
  res.json(response);
  return;
});

Items.get('/:id', async ({ params }: Request, res: Response): Promise<void> => {
  const response = await get(Number(params.id));
  res.json(response);
  return;
});

Items.post('/', async (req: Request, res: Response): Promise<void> => {
  const response = await create(req.body);
  res.json(response);
  return;
});

Items.put(
  '/:id',
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

Items.delete(
  '/:id',
  async ({ params }: Request, res: Response): Promise<void> => {
    const response = await remove(Number(params.id));
    res.json(response);
    return;
  }
);

export { Items };
