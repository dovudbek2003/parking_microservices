import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user-details')
export class UserDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    firstName: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    lastName: string;

    @Column({
        type: 'int',
        nullable: true,
    })
    avatar: number;


    @Column({
        name: 'user_id',
        type: 'int',
        nullable: false,
    })
    userId: number;

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

    @OneToOne(() => User, (user) => user.userDetail)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
