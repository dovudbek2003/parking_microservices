import { Layer } from "src/modules/layer/entities/layer.entity";
import { Service } from "src/modules/service/entities/service.entity";
import { Tariff } from "src/modules/tariff/entities/tariff.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @OneToMany(() => Layer, (layer) => layer.park)
    layers: Array<Layer>;

    @OneToMany(() => Tariff, (tariff) => tariff.park)
    tariffs: Array<Tariff>;

    @OneToMany(() => Service, (service) => service.park)
    services: Array<Service>
}



