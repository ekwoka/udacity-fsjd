import { Item, ItemStore } from '../../models';
import dotenv from 'dotenv';
import { database } from '../helpers/databaseSetup';

dotenv.config();

describe('ItemStore Model', () => {
  const { index, get, create, update, remove } = ItemStore;
  beforeAll(database);

  describe('has functional methods', () => {
    let testItem: Item;
    it('indexes items', async () => {
      expect(index).toBeDefined();
      const items = await index();
      expect(items).toBeDefined();
      expect(Array.isArray(items)).toBeTrue();
    });
    it('creates new item', async () => {
      expect(create).toBeDefined();
      const item = await create({
        name: 'testcreate',
        description: 'testing the create method',
      });
      expect(item.id).toBeDefined();
      testItem = item;
    });
    it('gets item', async () => {
      expect(get).toBeDefined();
      const { name } = await get(testItem.id);
      expect(name).toBeDefined();
      expect(name).toBe('testcreate');
    });
    it('updates item', async () => {
      expect(update).toBeDefined();
      const { name } = await update({
        id: testItem.id,
        name: 'test update',
        description: 'testing the update method',
      });
      expect(name).toBeDefined();
      expect(name).toBe('test update');
    });
    it('removes item', async () => {
      expect(remove).toBeDefined();
      const item = await remove(testItem.id);
      expect(item).toBeDefined();
      expect(item.id).toBe(testItem.id);
    });
  });
});
