import { Request, Response } from 'express';
import { Dashboard } from '../../services';

export const mostExpensive = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await Dashboard.getMostExpensiveProducts();
    res.json(data);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const activeUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await Dashboard.usersWithMostOpenOrders();
    res.json(data);
  } catch (error) {
    res.status(400).json({ error });
  }
};
