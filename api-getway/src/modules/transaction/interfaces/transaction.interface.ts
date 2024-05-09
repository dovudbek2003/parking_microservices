import { Observable } from "rxjs";
import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { UpdateTransactionDto } from "../dto/update-transaction.dto";

export interface ITransaction {
    id: number;
    shotCreditId: number;
    shotDebitId: number;
    serviceId: number;
    amount: number;
    createdAt: Date;
    lastUpdatedAt: Date;
}

export interface ITransactionResponseData<T> {
    message: string;
    statusCode: number;
    data: T
}

// export interface CreateShotDto {
//     userId: number;
//     amount: number;
// }

// export interface UpdateShotDto extends CreateShotDto {
//     id: number;
// }

export interface ITransactionService {
    create(createTransactionDto: CreateTransactionDto): Observable<ITransactionResponseData<ITransaction>>
    findAll({}): Observable<ITransactionResponseData<Array<ITransaction>>>
    findOne({id}: {id:number}): Observable<ITransactionResponseData<ITransaction>>
    update(updateTransactionDto: UpdateTransactionDto): Observable<ITransactionResponseData<ITransaction>>
    remove({id}: {id:number}): Observable<ITransactionResponseData<ITransaction>>
}