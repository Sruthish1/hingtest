import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const options: TypeOrmModuleOptions = {
  type: 'postgres',
  schema: 'public',
  retryAttempts: 10,
  retryDelay: 3,
  namingStrategy: new SnakeNamingStrategy(),
  url: 'postgres://hinge_dev:hinge_password@postgres:5432/trees',
  synchronize: true,
  logging: false,
  ssl: false,
  entities: [__dirname + '/*.entity.{ts,js}'],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
  migrationsTableName: 'typeorm_migrations',
  cli: {
    migrationsDir: __dirname + '/../migrations',
  },
};

export default options;
