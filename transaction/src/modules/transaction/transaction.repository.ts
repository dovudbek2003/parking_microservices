import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { ITransactionRepository } from "./interfaces/transaction.repository";
import { TransactionEntity } from "./entities/transaction.entity";
import { Shot } from "../shot/entities/shot.entity";

export class TransactionRepository implements ITransactionRepository {
    constructor(
        @InjectRepository(TransactionEntity) private readonly repository: Repository<TransactionEntity>,
        private dataSource: DataSource
    ) { }

    // CREATE
    async create(transactionEntity: TransactionEntity, newCreditShotEntity: Shot, newDebitShotEntity: Shot): Promise<TransactionEntity | any> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const transactionRepository = queryRunner.manager.getRepository(TransactionEntity);
            const shotRepository = queryRunner.manager.getRepository(Shot);

            await shotRepository.save(newCreditShotEntity);
            await shotRepository.save(newDebitShotEntity);
            const newTransaction = await transactionRepository.save(transactionEntity);
            await queryRunner.commitTransaction();
            return newTransaction
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    // READ
    async findAll(): Promise<TransactionEntity[]> {
        return this.repository.find()
    }
    async findOne(id: number): Promise<TransactionEntity> {
        return this.repository.findOneBy({ id })
    }

    // UPDATE
    async update(transactionEntity: TransactionEntity): Promise<TransactionEntity> {
        return this.repository.save(transactionEntity)
    }

    // DELETE
    async remove(id: number): Promise<TransactionEntity> {
        const foundTransaction = await this.findOne(id)
        await this.repository.delete(id)
        return foundTransaction;
    }
}