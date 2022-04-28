import { ItemStore } from '../../models';
import dotenv from 'dotenv';

dotenv.config();

describe('ItemStore Model', () => {
  const { index, get, create, update, remove } = ItemStore;

  describe('has functional methods', () => {
    it('indexes items', async () => {
      expect(index).toBeDefined();
      const items = await index();
      expect(items).toBeDefined();
      expect(items).toEqual([]);
    });
    it('creates new item', async () => {
      expect(create).toBeDefined();
      const { id } = await create({
        name: 'testcreate',
        description: 'testing the create method',
      });
      expect(id).toBe(1);
    });
    it('gets item', async () => {
      expect(get).toBeDefined();
      const { name } = await get(1);
      expect(name).toBeDefined();
      expect(name).toBe('testcreate');
    });
    it('updates item', async () => {
      expect(update).toBeDefined();
      const { name } = await update({
        id: 1,
        name: 'test update',
        description: 'testing the update method',
      });
      expect(name).toBeDefined();
      expect(name).toBe('test update');
    });
    it('removes item', async () => {
      expect(remove).toBeDefined();
      const item = await remove(1);
      expect(item).toBeDefined();
      expect(item.id).toBe(1);
    });
  });
});
