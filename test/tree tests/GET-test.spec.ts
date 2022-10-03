import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { equals } from 'class-validator';

describe('GET', () => {
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

  it('/api/tree will return 200 code', async () => {
    const payload = `{"id":1,"name":"rootElement","children":[{"id":3,"name":"bear","children":[{"id":4,"name":"cat"},{"id":5,"name":"dog","children":[{"id":6,"name":"elephant"}]}]},{"id":7,"name":"frog"},{"id":9,"name":"ant"}]}`;
    const response = await request(app.getHttpServer()).get('/api/tree').expect(200);
    const responseInStringFormat = JSON.stringify(response.body)
    //expect(responseInStringFormat).toEqual(payload);

  });
});

