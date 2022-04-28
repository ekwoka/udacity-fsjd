import { compare, hash } from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;

export const saltNPepper = (plaintext: string): Promise<string> => {
  const peppered = `${plaintext}${BCRYPT_PASSWORD}`;
  return hash(peppered, Number(SALT_ROUNDS));
};

export const compareSalted = (
  plaintext: string,
  hashed: string
): Promise<boolean> => {
  const peppered = `${plaintext}${BCRYPT_PASSWORD}`;
  return compare(peppered, hashed);
};
