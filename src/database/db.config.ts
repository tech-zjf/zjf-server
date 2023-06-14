import { ArticleEntity } from './entities/article.entity';
import { CategoryRelatedEntity } from './entities/category-related.entity';
import { CategoryEntity } from './entities/category.entity';
import { TestEntity } from './entities/test.entity';
import { User } from './entities/user.entity';

const devDbConfig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'zjf012511',
  database: 'zjfserver',
  // entities: [__dirname + '/entities/*.ts'],
  entities: [
    TestEntity,
    User,
    ArticleEntity,
    CategoryEntity,
    CategoryRelatedEntity,
  ],
  synchronize: true,
  migrationsTableName: 'migrations_typeorm',
  migrations: ['src/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

const prodDbConfig = {
  type: 'mysql',
  host: '101.132.36.144',
  port: 3306,
  username: 'root',
  password: 'Zjf012511..',
  database: 'zjfserver',
  // entities: [__dirname + '/entities/*.ts'],
  entities: [
    TestEntity,
    User,
    ArticleEntity,
    CategoryEntity,
    CategoryRelatedEntity,
  ],
  synchronize: true,
  migrationsTableName: 'migrations_typeorm',
  migrations: ['src/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

const dbConfigMap = new Map([
  ['prod', prodDbConfig],
  ['dev', devDbConfig],
]);

const dbConfig = dbConfigMap.get(process.env.NODE_ENV) || devDbConfig;

export default dbConfig;
