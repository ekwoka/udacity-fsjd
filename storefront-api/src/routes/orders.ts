import { Router, Request, Response } from 'express';
import { VerifyAuthToken } from '../middleware/verifyAuthToken';
import { OrderStore } from '../models';

const Orders = Router();

Orders.get('/', VerifyAuthToken, getOrders);
Orders.get('/:id', VerifyAuthToken, showOrder);
Orders.post('/', VerifyAuthToken, createOrder);
Orders.put('/:id', VerifyAuthToken, updateOrder);

const { index, create, get, addProduct } = OrderStore;

async function getOrders(req: Request, res: Response) {
  const { id } = res.locals.user;
  try {
    const response = await index(id);
    res.json(response);
  } catch (e) {
    console.log(e);
    res.status(401).json({ error: e });
  }
  return;
}

async function showOrder(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const response = await get(Number(id));
    res.json(response);
  } catch (e) {
    console.log(e);
    res.status(401).json({ error: e });
  }
  return;
}

async function createOrder(req: Request, res: Response) {
  const { user_id } = req.body;
  try {
    if (!user_id) throw 'user_id is required';
    const response = await create(user_id);
    res.json(response);
  } catch (e) {
    res.status(401).json({ error: e });
  }
  return;
}

async function updateOrder(req: Request, res: Response) {
  const { order_id, item_id, quantity } = req.body;
  try {
    if (!order_id || !item_id || !quantity)
      throw 'order_id, item_id, and quantity are required';
    const response = await addProduct(order_id, item_id, quantity);
    res.json(response);
  } catch (e) {
    res.status(401).json({ error: e });
  }
}

export { Orders };
