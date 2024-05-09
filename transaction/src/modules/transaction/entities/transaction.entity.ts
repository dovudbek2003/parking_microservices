import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('transactions')
export class TransactionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'shot_credit_id',
        type: 'int',
        nullable: false,
    })
    shotCreditId: number;

    @Column({
        name: 'shot_debit_id',
        type: 'int',
        nullable: false,
    })
    shotDebitId: number;

    @Column({
        name: 'service_id',
        type: 'int',
        nullable: false,
    })
    serviceId: number;

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
