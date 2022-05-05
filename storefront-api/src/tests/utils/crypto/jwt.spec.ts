import { UserReturn } from '../../../models';
import { createJWT, verifyJWT } from '../../../utils/crypto/jwt';

describe('JWT Cryptography', () => {
  it('creates JWTs from Objects', async () => {
    const payload: UserReturn = {
      id: 1,
      first_name: 'test',
      last_name: 'user',
      email: 'jwt@test.com',
      role: 'user',
    };
    const token = await createJWT(payload);
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  it('verifies JWTs', async () => {
    const payload: UserReturn = {
      id: 1,
      first_name: 'test',
      last_name: 'user',
      email: 'jwt@test.com',
      role: 'user',
    };
    const token = await createJWT(payload);
    const verified = await verifyJWT(token);
    expect(verified).toBeDefined();
    expect(verified?.email).toEqual('jwt@test.com');
  });
  it('rejects modified JWTs', async () => {
    const payload: UserReturn = {
      id: 1,
      first_name: 'test',
      last_name: 'user',
      email: 'jwt@test.com',
      role: 'user',
    };
    const token = await createJWT(payload);
    const modifiedToken = token.replace(/[a-z]/, 'A');
    const verified = await verifyJWT(modifiedToken);
    expect(verified).toBeNull();
  });
});
