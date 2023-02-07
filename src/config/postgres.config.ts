import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const postgresConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'geferson',
    password: 'gel881206',
    database: 'pgsql2',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
};
