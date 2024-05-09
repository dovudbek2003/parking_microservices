import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user-tariffs')
export class UserTariff {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'user_id',
        type: 'int',
        nullable: false,
    })
    userId: number;

    @Column({
        name: 'tariff_id',
        type: 'int',
        nullable: false,
    })
    tariffId: number;

    @Column({
        name: 'started_at',
        type: 'timestamp',
        nullable: false,
    })
    startedAt: Date;

    @Column({
        name: 'ended_at',
        type: 'timestamp',
        nullable: false,
    })
    endedAt: Date;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        nullable: false,
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'last_update_at',
        type: 'timestamp',
        nullable: false,
    })
    lastUpdatedAt: Date;
}
