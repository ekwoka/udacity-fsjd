import { Client } from '../database';

export type ProductDB = ProductData & {
  id: number;
};

export type ProductData = {
  name: string;
  price: number;
  category_id?: number;
};

export type ProductUpdate = {
  id: number;
  name?: string;
  price?: number;
  category_id?: number;
};

export const ProductStore = {
  async index(): Promise<ProductDB[]> {
    try {
      const connection = await Client.connect();
      const query = `SELECT * FROM products`;
      const result = (await connection.query(query)).rows as ProductDB[];
      connection.release();
      return result;
    } catch (e) {
      console.log(e);
      return [];
    }
  },
  async get(id: number): Promise<ProductDB | null> {
    try {
      const connection = await Client.connect();
      const query = `SELECT * FROM products WHERE id = $1`;
      const result = (await connection.query(query, [id])).rows[0] as ProductDB;
      connection.release();
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  async create({
    name,
    price,
    category_id,
  }: ProductData): Promise<ProductDB | null> {
    try {
      const connection = await Client.connect();
      const query = `INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3) RETURNING *`;
      const result = (await connection.query(query, [name, price, category_id]))
        .rows[0] as ProductDB;
      connection.release();
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  async update({
    id,
    ...updateData
  }: ProductUpdate): Promise<ProductDB | null> {
    const oldData = await ProductStore.get(id);
    if (!oldData) throw 'Product not found';
    const { name, price, category_id } = {
      ...oldData,
      ...updateData,
    };
    try {
      const connection = await Client.connect();
      const query = `UPDATE products SET name = $2, price = $3 category_id = $4 WHERE id = $1 RETURNING *`;
      const result = (
        await connection.query(query, [id, name, price, category_id])
      ).rows[0] as ProductDB;
      connection.release();
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  async remove(id: number): Promise<ProductDB | null> {
    try {
      const connection = await Client.connect();
      const query = `DELETE FROM products WHERE id = $1 RETURNING *`;
      const result = (await connection.query(query, [id])).rows[0] as ProductDB;
      connection.release();
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
};
