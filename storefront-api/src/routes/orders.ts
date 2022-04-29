import { Router, Request, Response } from 'express';
import { OrderStore } from '../models';

const Orders = Router();

Orders.get('/', getOrders);
Orders.get('/:id', showOrder);
Orders.post('/', createOrder);
Orders.put('/:id', updateOrder);

const { index, create, get, addItem } = OrderStore;

async function getOrders(req: Request, res: Response) {
  const response = await index();
  res.json(response);
  return;
}

async function showOrder(req: Request, res: Response) {
  const { id } = req.params;
  const response = await get(Number(id));
  res.json(response);
  return;
}

async function createOrder(req: Request, res: Response) {
  const { user_id } = req.body;
  try {
    if (!user_id) throw 'user_id is required';
    const response = await create(user_id);
    res.json(response);
  } catch (e) {
    res.status(400).json({ error: e });
  }
  return;
}

async function updateOrder(req: Request, res: Response) {
  const { order_id, item_id, quantity } = req.body;
  try {
    if (!order_id || !item_id || !quantity)
      throw 'order_id, item_id, and quantity are required';
    const response = await addItem(order_id, item_id, quantity);
    res.json(response);
  } catch (e) {
    res.status(400).json({ error: e });
  }
}

export { Orders };
