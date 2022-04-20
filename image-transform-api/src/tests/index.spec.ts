import { app } from '../index.js';
import supertest from 'supertest';
import { getSize, getType } from '../utils/index.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { existsSync } from 'fs';

describe('Server', (): void => {
  it('connects', (): void => {
    supertest(app).get('/images/icelandwaterfall.jpg?width=100').expect(200);
  });

  it('returns an image', (): void => {
    supertest(app)
      .get('/images/icelandwaterfall.jpg?width=100')
      .expect(200)
      .expect('Content-Type', /image/);
  });

  describe('Returns resized images', (): void => {
    it('defined width', (): void => {
      supertest(app)
        .get('/images/icelandwaterfall.jpg?width=100')
        .expect(200)
        .end((err, { body }): void => {
          expect(getSize(body).width).toBe(100);
        });
    });

    it('defined height', (): void => {
      supertest(app)
        .get('/images/icelandwaterfall.jpg?height=100')
        .expect(200)
        .end((err, { body }): void => {
          expect(getSize(body).height).toBe(100);
        });
    });

    it('defined width and height', (): void => {
      supertest(app)
        .get('/images/icelandwaterfall.jpg?width=100&height=100')
        .expect(200)
        .end((err, { body }): void => {
          expect(getSize(body).width).toBe(100);
          expect(getSize(body).height).toBe(100);
        });
    });
  });

  describe('Returns correctly formatted images', (): void => {
    it('webp', (): void => {
      supertest(app)
        .get('/images/icelandwaterfall.jpg?width=100&height=100')
        .set('Accept', 'image/webp')
        .expect(200)
        .end((err, { body }): void => {
          expect(getType(body)).toBe('webp');
        });
    });

    it('jpg', (): void => {
      supertest(app)
        .get('/images/icelandwaterfall.jpg?width=100&height=100')
        .set('Accept', 'image/jpg')
        .expect(200)
        .end((err, { body }): void => {
          expect(getType(body)).toBe('jpg');
        });
    });
  });

  it('Caches repeat requests', (): void => {
    supertest(app)
      .get('/images/icelandwaterfall.jpg?width=300')
      .expect(200)
      .end(async (): Promise<void> => {
        const filePath = path.join(
          fileURLToPath(import.meta.url),
          '..',
          '..',
          'images',
          'cache',
          `icelandwaterfall_300x.webp`
        );
        expect(existsSync(filePath)).toBe(true);
      });
  });

  describe('Error handling', () => {
    it('handles non-existent images', (): void => {
      supertest(app)
        .get('/images/tobymcquire.jpg?width=100')
        .expect(404)
        .end(({ rawResponse: error }, res): void => {
          expect(res).toBeUndefined();
          expect(error).toBe('Requested File does not exist');
        });
    });

    it('handles non-image requests', (): void => {
      supertest(app)
        .get('/images/tobymcquire?width=100')
        .expect(404)
        .end((err, res): void => {
          expect(res).toBeUndefined();
          expect(err.rawResponse).toBe(
            'Requested path is not an image file. Check path for file-extension'
          );
        });
    });
  });
});
