import { Team } from 'src/teams/entities/team.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    position: string;

    @Column()
    number: number;

    @ManyToOne(() => Team, (team) => team.players, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    team: Team;
}
