import dotenv from 'dotenv';
import pg from 'pg';
const { Pool } = pg;

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_TEST_DB,
  ENV,
} = process.env;

const Client = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DB,
  port: Number(POSTGRES_PORT),
});
export { Client };
