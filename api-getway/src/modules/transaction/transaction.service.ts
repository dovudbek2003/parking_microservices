import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ITransactionService } from './interfaces/transaction.interface';
import { TRANSACTION_PACKAGE } from 'src/common/const/servers';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class TransactionService {
  private transactionService: ITransactionService

  constructor(
    @Inject(TRANSACTION_PACKAGE) private transactionClient: ClientGrpc
  ) { }

  onModuleInit() {
    this.transactionService = this.transactionClient.getService<ITransactionService>('TransactionService');
  }

  async create(createShotDto: CreateTransactionDto) {
    return this.transactionService.create(createShotDto);
  }

  async findAll() {
    return this.transactionService.findAll({});
  }

  async findOne(id: number) {
    return this.transactionService.findOne({ id });
  }

  async update(updateShotDto: UpdateTransactionDto) {
    return this.transactionService.update(updateShotDto);
  }

  async remove(id: number) {
    return this.transactionService.remove({ id });
  }
}
