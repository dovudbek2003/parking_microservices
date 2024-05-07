import { Layer } from "src/modules/layer/entities/layer.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('places')
export class Place {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    name: string;

    @Column({
        type: 'int',
        nullable: false,
    })
    price: number;

    @Column({
        name: 'layer_id',
        type: 'int'
    })
    layerId: number;

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

    @ManyToOne((type) => Layer, (layer) => layer.places)
    @JoinColumn({ name: 'layer_id' })
    layer: Layer
}
