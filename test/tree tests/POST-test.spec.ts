import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { equals } from 'class-validator';

describe('POST', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });

  it('POST /api/tree/', async () => {

    let payload ={
      "parentId": 1,
      "name": "ant"
  }
    console.log(payload)
    const response = await request(app.getHttpServer()).post('/api/tree').send(payload).expect(204);
  });
});

