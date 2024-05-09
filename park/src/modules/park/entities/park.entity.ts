import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('parks')
export class Park {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        unique: true,
        nullable: false
    })
    name: string;

    @Column({
        type: 'int',
        nullable: true,
    })
    owner: number;

    @Column({
        type: 'int',
        nullable: true,
    })
    image: number;

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



