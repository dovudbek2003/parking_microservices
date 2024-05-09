import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('shots')
export class Shot {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'user_id',
        type: 'int',
        nullable: false,
    })
    userId: number;

    @Column({
        type: 'int',
        nullable: false,
    })
    amount: number;

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
