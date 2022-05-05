import { saltNPepper, compareSalted } from '../../utils/';

const plaintext = 'thisisatestpassword';

describe('Hashing with BCRYPT', () => {
  let testHash: string;
  it('should return a hashed string', async (): Promise<void> => {
    const hash = await saltNPepper(plaintext);
    expect(hash).toBeDefined();
    expect(hash).toBeTruthy();
    testHash = hash;
  });

  it('should compare a plaintext string to a hashed string', async (): Promise<void> => {
    const isCorrect = await compareSalted(plaintext, testHash);
    expect(isCorrect).toBe(true);
  });

  it('should return false when comparing an incorrect match', async (): Promise<void> => {
    const isCorrect = await compareSalted('badpassword', testHash);
    expect(isCorrect).toBe(false);
  });
});
