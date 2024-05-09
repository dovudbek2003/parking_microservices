import { ResponseData } from "src/lib/response-data"
import { CreateTransactionDto } from "../dto/create-transaction.dto"
import { UpdateTransactionDto } from "../dto/update-transaction.dto"
import { Shot } from "src/modules/shot/entities/shot.entity"
import { TransactionEntity } from "../entities/transaction.entity"

export interface ITransactionService {
    create(createTransactionDto: CreateTransactionDto, foundShotCreatidByUserId: Shot, foundShotDebitId: Shot): Promise<ResponseData<TransactionEntity>>
    findAll(): Promise<ResponseData<Array<TransactionEntity>>>
    findOne(id: number): Promise<ResponseData<TransactionEntity>>
    remove(id: number): Promise<ResponseData<TransactionEntity>>
}