import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 5434,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_DATABASE || 'crm',
  synchronize: process.env.DB_SYNCHRONIZE === 'true' || false,
  entities: ['dist/modules/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  subscribers: ['dist/modules/**/*.subscriber{.ts,.js}'],
  namingStrategy: new SnakeNamingStrategy(),
  logging: process.env.DB_LOGGING === 'true' || false,
  migrationsRun: process.env.MIGRATION_RUN === 'true' || false,
};
export const dataSource = new DataSource(dataSourceOptions);
