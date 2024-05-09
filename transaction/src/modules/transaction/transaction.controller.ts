import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ITransactionService } from './interfaces/transaction.service';
import { IShotService } from '../shot/interfaces/shot.service';

@Controller()
export class TransactionController {
  constructor(
    @Inject('ITransactionService') private readonly transactionService: ITransactionService,
    @Inject('IShotService') private readonly shotService: IShotService,
  ) { }

  @GrpcMethod('TransactionService', 'Create')
  async create(createTransactionDto: CreateTransactionDto) {
    const foundShotCreatId = await this.shotService._findByUserId(createTransactionDto.shotCreditId)
    const foundShotDebitId = await this.shotService._findByUserId(createTransactionDto.shotDebitId)
    return this.transactionService.create(createTransactionDto, foundShotCreatId, foundShotDebitId);
  }

  @GrpcMethod('TransactionService', 'FindAll')
  async findAll() {
    return this.transactionService.findAll();
  }

  @GrpcMethod('TransactionService', 'FindOne')
  async findOne({ id }: { id: number }) {
    return this.transactionService.findOne(id);
  }

  @GrpcMethod('TransactionService', 'Remove')
  async remove({ id }: { id: number }) {
    return this.transactionService.remove(id);
  }
}
