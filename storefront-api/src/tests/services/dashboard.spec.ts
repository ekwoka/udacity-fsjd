import { Dashboard } from '../../services';
import { database } from '../helpers/databaseSetup';

describe('Dashboard Service', () => {
  beforeAll(database);
  it('should be defined', () => {
    expect(Dashboard).toBeDefined();
  });
  it('should return the most expensive Products', async (): Promise<void> => {
    const items = await Dashboard.getMostExpensiveProducts();
    expect(Array.isArray(items)).toBeTrue();
    expect(items[0]).toBeDefined();
    expect(items[0].name).toBeDefined();
  });
  it('should return the Users with the most Open order', async (): Promise<void> => {
    const users = await Dashboard.usersWithMostOpenOrders();
    expect(Array.isArray(users)).toBeTrue();
    expect(users[0]).toBeDefined();
    expect(users[0].user_id).toBeDefined();
  });
});
