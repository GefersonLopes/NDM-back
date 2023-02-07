import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from 'src/teams/entities/team.entity';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
    constructor(
        @InjectRepository(Player) private playersRepository: Repository<Player>,
        @InjectRepository(Team) private teamsRepository: Repository<Team>
    ) {}

    async verifyPlayer({ name }: CreatePlayerDto | UpdatePlayerDto) {
        return !!(await this.playersRepository.findOne({ name }));
    }

    async verifyTeam(id: number) {
        return await this.teamsRepository.findOne({ id });
    }

    async create(createPlayerDto: CreatePlayerDto) {
        const team = await this.verifyTeam(createPlayerDto.teamId);
        if (!team) throw new BadRequestException('Team not found');

        if (await this.verifyPlayer(createPlayerDto))
            throw new BadRequestException('Player already exists');

        const player = Object.assign(new Player(), {
            ...createPlayerDto,
            team,
        });
        return await this.playersRepository.save(player);
    }

    async findAll() {
        return await this.playersRepository.find();
    }

    async findAllPlayersInTeam(id: number) {
        const team = await this.verifyTeam(id);
        if (!team) throw new BadRequestException('Team not found');
        return await this.playersRepository.find({ where: { team } });
    }

    async findOne(id: number) {
        const player = await this.playersRepository.findOne({ where: { id } });
        if (!player) {
            throw new BadRequestException('Player not found');
        }
        return player;
    }

    async update(id: number, updatePlayerDto: UpdatePlayerDto) {
        const player = await this.findOne(id);
        if (!player) {
            throw new BadRequestException('Player not found');
        }
        if (await this.verifyPlayer(updatePlayerDto)) {
            throw new BadRequestException('Player name already exists');
        }
        return this.playersRepository.save({ ...player, ...updatePlayerDto });
    }

    async remove(id: number) {
        const isExists = await this.playersRepository.findOne({
            where: { id },
        });
        if (!isExists) {
            throw new BadRequestException('Player not found');
        }
        await this.playersRepository.delete(id);
    }
}
