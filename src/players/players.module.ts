import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { Player } from './entities/player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Team } from 'src/teams/entities/team.entity';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([Player]),
        TypeOrmModule.forFeature([Team]),
    ],
    controllers: [PlayersController],
    providers: [PlayersService],
    exports: [PlayersService],
})
export class PlayersModule {}
