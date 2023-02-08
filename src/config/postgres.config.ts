import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const postgresConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'pgsql2',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
};
