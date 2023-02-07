import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig } from './config/postgres.config';
import { TeamsModule } from './teams/teams.module';
import { PlayersModule } from './players/players.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(postgresConfig),
        TeamsModule,
        PlayersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
