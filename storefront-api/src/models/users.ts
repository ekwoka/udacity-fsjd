import { Client } from '../database';
import { compareSalted, saltNPepper } from '../utils';
import { createJWT } from '../utils/crypto/jwt';

export type User = {
  id?: number;
  username: string;
  email: string;
  password: string;
};
export type UserPartial = {
  email: string;
  password: string;
};

export const UserStore = {
  async index(): Promise<User[]> {
    try {
      const connection = await Client.connect();
      const query = `SELECT * FROM users`;
      const result = await connection.query(query);
      connection.release();
      return result.rows as User[];
    } catch (e) {
      console.log(e);
      return [];
    }
  },
  async get(id: number): Promise<User> {
    try {
      const connection = await Client.connect();
      const query = `SELECT * FROM users WHERE id = $1`;
      const result = await connection.query(query, [id]);
      connection.release();
      return result.rows[0] as User;
    } catch (e) {
      console.log(e);
      return { id: 0, username: '', email: '', password: '' };
    }
  },
  async create({ username, email, password }: User): Promise<string | null> {
    try {
      const connection = await Client.connect();
      const query = `INSERT INTO users (username, email, password_digest) VALUES ($1, $2, $3) RETURNING *`;
      const hashedPassword = await saltNPepper(password);
      const result = await connection.query(query, [
        username,
        email,
        hashedPassword,
      ]);
      connection.release();
      const userData = result.rows[0] as User;
      return await createJWT(userData);
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  async update({
    id,
    username,
    email,
    password,
  }: User): Promise<string | null> {
    try {
      const connection = await Client.connect();
      const query = `UPDATE users SET username = $1, email = $2, password_digest = $3 WHERE id = $4 RETURNING *`;
      const hashedPassword = await saltNPepper(password);
      const result = await connection.query(query, [
        username,
        email,
        hashedPassword,
        id,
      ]);
      connection.release();
      const userData = result.rows[0] as User;
      return await createJWT(userData);
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  async remove(id: number): Promise<User> {
    try {
      const connection = await Client.connect();
      const query = `DELETE FROM users WHERE id = $1 RETURNING *`;
      const result = await connection.query(query, [id]);
      connection.release();
      return result.rows[0] as User;
    } catch (e) {
      console.log(e);
      return { id: 0, username: '', email: '', password: '' };
    }
  },
  async authenticate({
    email,
    password,
  }: UserPartial): Promise<{ id: string } | null> {
    try {
      const connection = await Client.connect();
      const query = `SELECT * FROM users WHERE email = $1`;
      const result = await connection.query(query, [email]);
      connection.release();
      if (!result.rows.length) throw `No users found with email ${email}`;
      const { id, password_digest } = result.rows[0];
      if (!(await compareSalted(password, password_digest)))
        throw `Incorrect password`;
      return { id };
    } catch (e) {
      console.log(e);
      return null;
    }
  },
};
