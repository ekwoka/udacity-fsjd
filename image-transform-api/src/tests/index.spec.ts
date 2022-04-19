import { app } from '../index.js';
import supertest from 'supertest';
import { getSize, getType } from '../utils/index.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { existsSync } from 'fs';

describe('Server', () => {
  it('connects', () => {
    supertest(app).get('/images/icelandwaterfall.jpg?width=100').expect(200);
  });

  it('returns an image', () => {
    supertest(app)
      .get('/images/icelandwaterfall.jpg?width=100')
      .expect(200)
      .expect('Content-Type', /image/);
  });

  describe('Returns resized images', () => {
    it('defined width', () => {
      supertest(app)
        .get('/images/icelandwaterfall.jpg?width=100')
        .expect(200)
        .end((err, { body }) => {
          expect(getSize(body).width).toBe(100);
        });
    });

    it('defined height', () => {
      supertest(app)
        .get('/images/icelandwaterfall.jpg?height=100')
        .expect(200)
        .end((err, { body }) => {
          expect(getSize(body).height).toBe(100);
        });
    });

    it('defined width and height', () => {
      supertest(app)
        .get('/images/icelandwaterfall.jpg?width=100&height=100')
        .expect(200)
        .end((err, { body }) => {
          expect(getSize(body).width).toBe(100);
          expect(getSize(body).height).toBe(100);
        });
    });
  });

  describe('Returns correctly formatted images', () => {
    it('webp', () => {
      supertest(app)
        .get('/images/icelandwaterfall.jpg?width=100&height=100')
        .set('Accept', 'image/webp')
        .expect(200)
        .end((err, { body }) => {
          expect(getType(body)).toBe('webp');
        });
    });

    it('jpg', () => {
      supertest(app)
        .get('/images/icelandwaterfall.jpg?width=100&height=100')
        .set('Accept', 'image/jpg')
        .expect(200)
        .end((err, { body }) => {
          expect(getType(body)).toBe('jpg');
        });
    });
  });

  it('Caches repeat requests', () => {
    supertest(app)
      .get('/images/icelandwaterfall.jpg?width=300')
      .expect(200)
      .end(async () => {
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
});
