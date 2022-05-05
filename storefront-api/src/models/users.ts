import { Client } from '../database';
import { compareSalted, saltNPepper } from '../utils';
import { createJWT } from '../utils/crypto/jwt';

type UserBase = {
  first_name: string;
  last_name: string;
  email: string;
  role: 'user' | 'admin';
};

export type UserData = UserBase & {
  password_digest: string;
};
export type LoginDetails = {
  email: string;
  password: string;
};
export type UserReturn = UserBase & {
  id: number;
};
type UserDB = UserData & UserReturn;

export type UserCreate = UserBase & LoginDetails;

export type UserUpdate = {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: string;
  password?: string;
};

export const UserStore = {
  async index(): Promise<UserReturn[]> {
    try {
      const connection = await Client.connect();
      const query = `SELECT id, first_name, last_name, email, role FROM users`;
      const result = (await connection.query(query)).rows as UserReturn[];
      connection.release();
      return result;
    } catch (e) {
      console.log(e);
      return [];
    }
  },
  async get(id: number): Promise<UserReturn | null> {
    try {
      const connection = await Client.connect();
      const query = `SELECT id, first_name, last_name, email, role FROM users WHERE id = $1`;
      const result = (await connection.query(query, [id]))
        .rows[0] as UserReturn;
      connection.release();
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  async create({
    first_name,
    last_name,
    email,
    role,
    password,
  }: UserCreate): Promise<string | null> {
    try {
      const connection = await Client.connect();
      const query =
        'INSERT INTO users (first_name, last_name, email, role, password_digest) VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, email, role';
      const hashedPassword = await saltNPepper(password);
      const result = (
        await connection.query(query, [
          first_name,
          last_name,
          email,
          role,
          hashedPassword,
        ])
      ).rows[0] as UserReturn;
      connection.release();
      return await createJWT(result);
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  async update({ id, ...updateData }: UserUpdate): Promise<string | null> {
    const oldData = await UserStore.get(id);
    if (oldData == null) throw 'User not found';
    const { first_name, last_name, email, role, password } = {
      ...oldData,
      ...updateData,
    };
    try {
      const connection = await Client.connect();
      const query = password
        ? 'UPDATE users SET first_name = $2, last_name = $3, email = $4, role = $5, password_digest = $6 WHERE id = $1 RETURNING id, first_name, last_name, email, role'
        : 'UPDATE users SET first_name = $2, last_name = $3, email = $4, role = $5 WHERE id = $1 RETURNING id, first_name, last_name, email, role';
      const result = (
        await connection.query(query, [
          id,
          first_name,
          last_name,
          email,
          role,
          ...(password ? [await saltNPepper(password)] : []),
        ])
      ).rows[0] as UserReturn;
      connection.release();
      return await createJWT(result);
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  async remove(id: number): Promise<UserReturn | null> {
    try {
      const connection = await Client.connect();
      const query = `DELETE FROM users WHERE id = $1 RETURNING id, first_name, last_name, email, role`;
      const result = (await connection.query(query, [id]))
        .rows[0] as UserReturn;
      connection.release();
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  async authenticate({
    email,
    password,
  }: LoginDetails): Promise<string | null> {
    try {
      const connection = await Client.connect();
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = (await connection.query(query, [email])).rows[0] as UserDB;
      connection.release();
      if (!result) throw `No users found with email ${email}`;
      const { password_digest, ...user } = result;
      if (!(await compareSalted(password, password_digest)))
        throw `Incorrect password`;
      return createJWT(user);
    } catch (e) {
      console.log(e);
      return null;
    }
  },
};
