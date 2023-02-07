import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
export declare class TeamsService {
    private teamsRepository;
    constructor(teamsRepository: Repository<Team>);
    verifyTeam({ name }: CreateTeamDto | UpdateTeamDto): Promise<boolean>;
    create(team: CreateTeamDto): Promise<CreateTeamDto & Team>;
    findAll(): Promise<Team[]>;
    findOne(id: number): Promise<Team>;
    update(id: number, updateTeamDto: UpdateTeamDto): Promise<{
        name: string;
        logo: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        players: import("../players/entities/player.entity").Player[];
    } & Team>;
    remove(id: number): Promise<void>;
}
