import { Player } from 'src/players/entities/player.entity';
export declare class Team {
    id: number;
    name: string;
    logo: string;
    createdAt: Date;
    updatedAt: Date;
    players: Player[];
}
