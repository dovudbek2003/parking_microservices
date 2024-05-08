import { Role } from "src/common/enums/role.enum";
import { UserDetail } from "src/modules/user-detail/entities/user-detail.entity";
import { UserTariff } from "src/modules/user-tariff/entities/user-tariff.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true,
    })
    phone: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    password: string;

    @Column({
        type: 'enum',
        enum: Role
    })
    role: Role;

    @Column({
        name: 'park_id',
        type: 'int',
        nullable: true,
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

    @OneToOne(() => UserDetail, (userDetail) => userDetail.user)
    userDetail: UserDetail;

    @OneToMany(() => UserTariff, (userTariff) => userTariff.user)
    userTariffs: Array<UserTariff>
}
