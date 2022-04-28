import { Client } from '../database';
import { Item } from './items';

export type Order = {
  id: number;
  user_id: number;
  status: 'open' | 'closed';
  items: Item[];
  created_at: EpochTimeStamp;
  updated_at: EpochTimeStamp;
};

export const OrderStore = {
  async get(id: number): Promise<Order | null> {
    try {
      const connection = await Client.connect();
      const query = `SELECT * FROM orders WHERE id = $1`;
      const result = await connection.query(query, [id]);
      connection.release();
      return result.rows[0] as Order;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  async create(user_id: number): Promise<Order | null> {
    try {
      const connection = await Client.connect();
      const query = `INSERT INTO orders (user_id, created_at, updated_at) VALUES ($1, $2, $3) RETURNING *`;
      const result = await connection.query(query, [
        user_id,
        new Date(),
        new Date(),
      ]);
      connection.release();
      return result.rows[0] as Order;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  async update(id: number): Promise<Order | null> {
    try {
      const connection = await Client.connect();
      const query = `UPDATE orders SET updated_at = $1 WHERE id = $2 RETURNING *`;
      const result = await connection.query(query, [new Date(), id]);
      connection.release();
      return result.rows[0] as Order;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  async remove(id: number): Promise<Order | null> {
    try {
      const connection = await Client.connect();
      const clearItemsQuery = `DELETE FROM order_items WHERE order_id = $1`;
      const clearOrderQuery = `DELETE FROM orders WHERE id = $1`;
      await connection.query(clearItemsQuery, [id]);
      const result = await connection.query(clearOrderQuery, [id]);
      connection.release();
      return result.rows[0] as Order;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  async addItem(
    order_id: number,
    item_id: number,
    quantity: number
  ): Promise<Order | null> {
    try {
      const connection = await Client.connect();
      const query = `INSERT INTO order_items (order_id, item_id, quantity) VALUES ($1, $2, $3) RETURNING *`;
      const result = await connection.query(query, [
        order_id,
        item_id,
        quantity,
      ]);
      const order = result.rows[0] as Order;
      connection.release();
      order.items = await OrderStore.getItems(order_id);
      OrderStore.update(order_id);
      return order;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  async removeItem(order_id: number, item_id: number): Promise<Order | null> {
    try {
      const connection = await Client.connect();
      const query = `DELETE FROM order_items WHERE order_id = $1 AND item_id = $2 RETURNING *`;
      const result = await connection.query(query, [order_id, item_id]);
      const order = result.rows[0] as Order;
      connection.release();
      order.items = await OrderStore.getItems(order_id);
      OrderStore.update(order_id);
      return order;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  async getItems(order_id: number): Promise<Item[]> {
    try {
      const connection = await Client.connect();
      const query = `SELECT * FROM order_items WHERE order_id = $1`;
      const result = await connection.query(query, [order_id]);
      connection.release();
      return result.rows as Item[];
    } catch (e) {
      console.log(e);
      return [];
    }
  },
};
