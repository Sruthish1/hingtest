import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Repository } from 'typeorm';
import { AppModule } from './app.module';
import { TreeElement } from './tree-element.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const treeRepo = app.get<Repository<TreeElement>>('TreeElementRepository');
  const count = await treeRepo.count();

  if (count === 0) {
    treeRepo.save([
      { parentId: null, name: 'rootElement' },
      { parentId: 1, name: 'ant' },
      { parentId: 1, name: 'bear' },
      { parentId: 3, name: 'cat' },
      { parentId: 3, name: 'dog' },
      { parentId: 5, name: 'elephant' },
      { parentId: 1, name: 'frog' },
    ]);
  }

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3515);
}

bootstrap();
