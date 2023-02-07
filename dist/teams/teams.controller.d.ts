import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
export declare class TeamsController {
    private readonly teamsService;
    constructor(teamsService: TeamsService);
    create(createTeamDto: CreateTeamDto): Promise<CreateTeamDto & import("./entities/team.entity").Team>;
    findAll(): Promise<import("./entities/team.entity").Team[]>;
    findOne(id: string): Promise<import("./entities/team.entity").Team>;
    update(id: string, updateTeamDto: UpdateTeamDto): Promise<{
        name: string;
        logo: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        players: import("../players/entities/player.entity").Player[];
    } & import("./entities/team.entity").Team>;
    remove(id: string): Promise<void>;
}
