import { Client } from '../database';
import { ProductDB } from '../models';

export const Dashboard = {
  async getMostExpensiveProducts(limit = 5): Promise<ProductDB[]> {
    const query = 'SELECT * FROM products ORDER BY price DESC LIMIT $1';
    const { rows } = await Client.query(query, [limit]);
    return rows;
  },
  async usersWithMostOpenOrders(limit = 5): Promise<userWOrderCount[]> {
    const query =
      'SELECT user_id, count(*) FROM users JOIN orders ON users.id = orders.user_id GROUP BY user_id ORDER BY count DESC LIMIT $1';
    const { rows } = await Client.query(query, [limit]);
    return rows;
  },
};

export type userWOrderCount = {
  user_id: number;
  count: number;
};
