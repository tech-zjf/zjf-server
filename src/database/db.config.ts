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
  entities: [TestEntity, User],
  synchronize: true,
  migrationsTableName: 'migrations_typeorm',
  migrations: ['src/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

const prodDbConfig = {};

const dbConfigMap = new Map([
  ['prod', prodDbConfig],
  ['dev', devDbConfig],
]);

const dbConfig = dbConfigMap.get(process.env.NODE_ENV) || devDbConfig;

export default dbConfig;
