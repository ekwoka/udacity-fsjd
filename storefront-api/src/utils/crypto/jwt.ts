import { readFile } from 'fs/promises';
import { Secret, sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import path from 'path';
import { UserReturn } from '../../models/users';

const algorithm = 'RS256';
const SIGN_OPTIONS: SignOptions = {
  algorithm,
};

const VERIFY_OPTIONS: VerifyOptions = {
  algorithms: [algorithm],
};

export const verifyJWT = async (token: string): Promise<UserReturn | null> => {
  try {
    const publicKey: Secret = await readFile(
      path.resolve(__dirname, '../../../secrets/jwtRS256.key.pub')
    );
    return verify(token, publicKey, VERIFY_OPTIONS) as UserReturn;
  } catch (e) {
    return null;
  }
};

export const createJWT = async (payload: UserReturn): Promise<string> => {
  const privateKey: Secret = await readFile(
    path.resolve(__dirname, '../../../secrets/jwtRS256.key')
  );
  return sign(payload, privateKey, SIGN_OPTIONS);
};
