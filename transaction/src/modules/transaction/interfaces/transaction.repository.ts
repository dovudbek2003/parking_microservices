import { Shot } from "src/modules/shot/entities/shot.entity"
import { TransactionEntity } from "../entities/transaction.entity"

export interface ITransactionRepository {
    create(transactionEntity: TransactionEntity, newCreditShotEntity: Shot, newDebitShotEntity: Shot): Promise<TransactionEntity>
    findAll(): Promise<Array<TransactionEntity>>
    findOne(id: number): Promise<TransactionEntity>
    update(transactionEntity: TransactionEntity): Promise<TransactionEntity>
    remove(id: number): Promise<TransactionEntity>
}