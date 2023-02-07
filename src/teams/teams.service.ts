import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(Team) private teamsRepository: Repository<Team>
    ) {}

    async verifyTeam({ name }: CreateTeamDto | UpdateTeamDto) {
        return !!(await this.teamsRepository.findOne({ name }));
    }

    async create(team: CreateTeamDto) {
        if (!(await this.verifyTeam(team))) {
            return await this.teamsRepository.save(team);
        }
        throw new BadRequestException('team already exists');
    }

    async findAll() {
        return await this.teamsRepository.find();
    }

    async findOne(id: number) {
        const team = await this.teamsRepository.findOne({ where: { id } });
        if (!team) {
            throw new BadRequestException('Team not found');
        }
        return team;
    }

    async update(id: number, updateTeamDto: UpdateTeamDto) {
        const team = await this.findOne(id);
        if (!team) {
            throw new BadRequestException('Team not found');
        }
        if (await this.verifyTeam(updateTeamDto)) {
            throw new BadRequestException('Team name already exists');
        }
        return this.teamsRepository.save({ ...team, ...updateTeamDto });
    }

    async remove(id: number) {
        const isExists = await this.teamsRepository.findOne({ where: { id } });
        if (!isExists) {
            throw new BadRequestException('Team not found');
        }
        await this.teamsRepository.delete(id);
    }
}
