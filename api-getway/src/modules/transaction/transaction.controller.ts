import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiTags } from '@nestjs/swagger';
import { ShotService } from '../shot/shot.service';
import { ServiceService } from '../service/service.service';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly shotService: ShotService,
    private readonly serviceService: ServiceService
  ) { }

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {

    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  async findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
