import { Client } from '../database';

export type Item = {
  id?: number;
  name: string;
  description: string;
};

export const ItemStore = {
  async index(): Promise<Item[]> {
    try {
      const connection = await Client.connect();
      const query = `SELECT * FROM items`;
      const result = await connection.query(query);
      connection.release();
      return result.rows as Item[];
    } catch (e) {
      console.log(e);
      return [];
    }
  },
  async get(id: number): Promise<Item> {
    try {
      const connection = await Client.connect();
      const query = `SELECT * FROM items WHERE id = $1`;
      const result = await connection.query(query, [id]);
      connection.release();
      return result.rows[0] as Item;
    } catch (e) {
      console.log(e);
      return { id: 0, name: '', description: '' };
    }
  },
  async create({ name, description }: Item): Promise<Item> {
    try {
      const connection = await Client.connect();
      const query = `INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *`;
      const result = await connection.query(query, [name, description]);
      connection.release();
      return result.rows[0] as Item;
    } catch (e) {
      console.log(e);
      return { id: 0, name: '', description: '' };
    }
  },
  async update({ id, name, description }: Item): Promise<Item> {
    try {
      const connection = await Client.connect();
      const query = `UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *`;
      const result = await connection.query(query, [name, description, id]);
      connection.release();
      return result.rows[0] as Item;
    } catch (e) {
      console.log(e);
      return { id: 0, name: '', description: '' };
    }
  },
  async remove(id: number): Promise<Item> {
    try {
      const connection = await Client.connect();
      const query = `DELETE FROM items WHERE id = $1 RETURNING *`;
      const result = await connection.query(query, [id]);
      connection.release();
      return result.rows[0] as Item;
    } catch (e) {
      console.log(e);
      return { id: 0, name: '', description: '' };
    }
  },
};
