import { Park } from "src/modules/park/entities/park.entity";
import { Tariff } from "src/modules/tariff/entities/tariff.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('services')
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'park_id',
        type: 'int'
    })
    parkId: number;

    @Column({
        name: 'user_id',
        type: 'int'
    })
    userId: number;

    @Column({
        name: 'started_at',
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    startedAt: Date;

    @Column({
        name: 'ended_at',
        type: 'timestamp',
        nullable: true,
    })
    endedAt: Date;

    @Column({
        type: 'int',
        nullable: true
    })
    price: number;

    @Column({
        name: 'tariff_id',
        type: 'int',
        nullable: true
    })
    tariffId: number;

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
