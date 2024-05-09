import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('layers')
export class Layer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    name: string;

    @Column({
        type: 'int',
        nullable: true
    })
    floor: number;

    @Column({
        name: 'park_id',
        type: 'int'
    })
    parkId: number;

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
