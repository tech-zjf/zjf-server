import { TestEntity } from './entities/test.entity';

const devDbConfig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'zjf012511',
  database: 'zjfserver',
  // entities: [__dirname + '/entities/*.ts'],
  entities: [TestEntity],
  synchronize: true,
};

const prodDbConfig = {};

const dbConfigMap = new Map([
  ['prod', prodDbConfig],
  ['dev', devDbConfig],
]);

const dbConfig = dbConfigMap.get(process.env.NODE_ENV) || devDbConfig;

export default dbConfig;
