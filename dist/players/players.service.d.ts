import { Team } from 'src/teams/entities/team.entity';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';
export declare class PlayersService {
    private playersRepository;
    private teamsRepository;
    constructor(playersRepository: Repository<Player>, teamsRepository: Repository<Team>);
    verifyPlayer({ name }: CreatePlayerDto | UpdatePlayerDto): Promise<boolean>;
    verifyTeam(id: number): Promise<Team>;
    create(createPlayerDto: CreatePlayerDto): Promise<Player & {
        team: Team;
        name: string;
        position: string;
        number: number;
        teamId: number;
    }>;
    findAll(): Promise<Player[]>;
    findAllPlayersInTeam(id: number): Promise<Player[]>;
    findOne(id: number): Promise<Player>;
    update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<{
        name: string;
        position: string;
        number: number;
        teamId?: number;
        id: number;
        team: Team;
    } & Player>;
    remove(id: number): Promise<void>;
}
