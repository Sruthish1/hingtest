import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { equals } from 'class-validator';

describe('DELETE', () => {
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

  it('DELETE /api/tree/<id>', async () => {
    let payload ={
      "parentId": 1,
      "name": "ant"
  }
    console.log(payload)
    const response = await request(app.getHttpServer()).post('/api/tree').send(payload).expect(204);
    const getResponse = await request(app.getHttpServer()).get('/api/tree').expect(200);
    const i=getResponse.body.children.length
    const id=getResponse.body.children[i-1].id
    console.log("ID:= "+id);
     const deleteResponse = await request(app.getHttpServer()).delete('/api/tree/'+id).expect(200);

  });
});

