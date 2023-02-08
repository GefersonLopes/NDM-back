"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgresConfig = void 0;
exports.postgresConfig = {
    type: 'postgres',
    host: process.env.DATABASE_HOST || '18.231.114.17',
    port: Number(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || '1234',
    database: process.env.DATABASE_NAME || 'pgsql2',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
};
//# sourceMappingURL=postgres.config.js.map