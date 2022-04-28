import { createJWT, verifyJWT } from '../../../utils/crypto/jwt';

describe('JWT Cryptography', () => {
  it('creates JWTs from Objects', async () => {
    const payload = {
      foo: 'bar',
      baz: 'qux',
    };
    const token = await createJWT(payload);
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  it('verifies JWTs', async () => {
    const payload = {
      foo: 'bar',
      baz: 'qux',
    };
    const token = await createJWT(payload);
    const verified = await verifyJWT(token);
    expect(verified).toBeDefined();
    expect(verified?.foo).toEqual('bar');
  });
  it('rejects modified JWTs', async () => {
    const payload = {
      foo: 'bar',
      baz: 'qux',
    };
    const token = await createJWT(payload);
    const modifiedToken = token.replace('b', 'B');
    const verified = await verifyJWT(modifiedToken);
    expect(verified).toBeNull();
  });
});
