import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
export declare class PlayersController {
    private readonly playersService;
    constructor(playersService: PlayersService);
    create(createPlayerDto: CreatePlayerDto): Promise<import("./entities/player.entity").Player & {
        team: import("../teams/entities/team.entity").Team;
        name: string;
        position: string;
        number: number;
        teamId: number;
    }>;
    findAll(): Promise<import("./entities/player.entity").Player[]>;
    findAllPlayers(id: string): Promise<import("./entities/player.entity").Player[]>;
    findOne(id: string): Promise<import("./entities/player.entity").Player>;
    update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<{
        name: string;
        position: string;
        number: number;
        teamId?: number;
        id: number;
        team: import("../teams/entities/team.entity").Team;
    } & import("./entities/player.entity").Player>;
    remove(id: string): Promise<void>;
}
