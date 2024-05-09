import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ITransactionService } from './interfaces/transaction.service';
import { ITransactionRepository } from './interfaces/transaction.repository';
import { ResponseData } from 'src/lib/response-data';
import { Shot } from '../shot/entities/shot.entity';
import { TransactionNotFound, UserHasInsufficientFunds } from './exception/transaction.exception';
import { TransactionEntity } from './entities/transaction.entity';

@Injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @Inject('ITransactionRepository') private transactionRepository: ITransactionRepository
  ) { }

  // CREATE
  async create(createTransactionDto: CreateTransactionDto, foundShotCreatidByUserId: Shot, foundShotDebitId: Shot): Promise<ResponseData<TransactionEntity>> {
    const remainingAmount = foundShotCreatidByUserId.amount - createTransactionDto.amount;
    if (remainingAmount < 0) {
      throw new UserHasInsufficientFunds()
    }

    const newTransaction = new TransactionEntity()

    newTransaction.shotCreditId = createTransactionDto.shotCreditId;
    newTransaction.shotDebitId = createTransactionDto.shotDebitId;
    newTransaction.serviceId = createTransactionDto.serviceId;
    newTransaction.amount = createTransactionDto.amount;

    const newCreditShotEntity = { ...foundShotCreatidByUserId, amount: remainingAmount };
    const newDebitShotEntity = { ...foundShotDebitId, amount: foundShotDebitId.amount + createTransactionDto.amount };

    const createdTransaction = await this.transactionRepository.create(newTransaction, newCreditShotEntity, newDebitShotEntity)

    return new ResponseData<TransactionEntity>('create', 201, createdTransaction)
  }

  // READ
  async findAll(): Promise<ResponseData<TransactionEntity[]>> {
    const transactions = await this.transactionRepository.findAll()
    return new ResponseData<Array<TransactionEntity>>('findAll', 200, transactions)
  }
  async findOne(id: number): Promise<ResponseData<TransactionEntity>> {
    const transaction = await this.transactionRepository.findOne(id);
    if (!transaction) {
      throw new TransactionNotFound()
    }
    return new ResponseData<TransactionEntity>('findOne', 200, transaction)
  }

  // UPDATE
  async update(id: number, updateTransactionDto: UpdateTransactionDto, foundShotCreatidByUserId: Shot | null, foundShotDebitId: Shot | null): Promise<ResponseData<TransactionEntity>> {
    // const { data: foundTransaction } = await this.findOne(id)
    // const remainingAmount = foundShotCreatidByUserId.amount - updateTransactionDto.amount;
    throw new Error('Method not implemented.');
  }

  // DELETE
  async remove(id: number): Promise<ResponseData<TransactionEntity>> {
    await this.findOne(id);
    const deletedTransaction = await this.transactionRepository.remove(id);
    return new ResponseData<TransactionEntity>('delete', 200, deletedTransaction)
  }
}
