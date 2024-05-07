import { Park } from "src/modules/park/entities/park.entity";
import { Service } from "src/modules/service/entities/service.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('tariffs')
export class Tariff {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar'
    })
    name: string;

    @Column({
        type: 'int'
    })
    price: number;

    @Column({
        type: 'int'
    })
    time: number;

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

    @OneToMany(()=> Service, (service)=> service.tariff)
    services: Array<Service>

    @ManyToOne((type) => Park, (park) => park.tariffs)
    @JoinColumn({ name: 'park_id' })
    park: Park;
}
