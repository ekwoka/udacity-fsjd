import { Client } from '../database';
import { ProductDB } from './products';

export type Order = {
  id: number;
  user_id: number;
  status: 'active' | 'closed';
  items: ProductDB[];
  created_at: EpochTimeStamp;
  updated_at: EpochTimeStamp;
};

export const OrderStore = {
  async index(user_id?: number): Promise<Order[]> {
    try {
      const connection = await Client.connect();
      const query =
        'SELECT * FROM orders' +
        (user_id ? ` WHERE user_id = $1 AND status = 'active'` : '');
      const result = await connection.query(query, user_id ? [user_id] : []);
      connection.release();
      return result.rows as Order[];
    } catch (e) {
      console.log(e);
      return [];
    }
  },
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
      const clearProductsQuery = `DELETE FROM order_products WHERE order_id = $1`;
      const clearOrderQuery = `DELETE FROM orders WHERE id = $1`;
      await connection.query(clearProductsQuery, [id]);
      const result = await connection.query(clearOrderQuery, [id]);
      connection.release();
      return result.rows[0] as Order;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  async addProduct(
    order_id: number,
    product_id: number,
    quantity: number
  ): Promise<Order | null> {
    try {
      const connection = await Client.connect();
      const { status } = (await OrderStore.get(order_id)) as Order;
      if (status === 'closed') throw 'Order is closed';
      const query = `INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *`;
      const result = (
        await connection.query(query, [order_id, product_id, quantity])
      ).rows[0] as Order;
      connection.release();
      result.items = await OrderStore.getProducts(order_id);
      OrderStore.update(order_id);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  async removeProduct(
    order_id: number,
    product_id: number
  ): Promise<Order | null> {
    try {
      const connection = await Client.connect();
      const query = `DELETE FROM order_products WHERE order_id = $1 AND product_id = $2 RETURNING *`;
      const result = await connection.query(query, [order_id, product_id]);
      const order = result.rows[0] as Order;
      connection.release();
      order.items = await OrderStore.getProducts(order_id);
      OrderStore.update(order_id);
      return order;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  async getProducts(order_id: number): Promise<ProductDB[]> {
    try {
      const connection = await Client.connect();
      const query = `SELECT * FROM order_products WHERE order_id = $1`;
      const result = await connection.query(query, [order_id]);
      connection.release();
      return result.rows as ProductDB[];
    } catch (e) {
      console.log(e);
      return [];
    }
  },
};
