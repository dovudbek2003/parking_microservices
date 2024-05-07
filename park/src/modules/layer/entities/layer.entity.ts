import { Park } from "src/modules/park/entities/park.entity";
import { Place } from "src/modules/place/entities/place.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @ManyToOne((type) => Park, (park) => park.layers, {
        onDelete: 'SET NULL',
        nullable: true
    })
    @JoinColumn({ name: 'park_id' })
    park: Park;

    @OneToMany((type) => Place, (place) => place.layer)
    places: Array<Place>;
}
