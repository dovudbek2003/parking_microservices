import { Inject, Injectable } from '@nestjs/common';
import { CreateShotDto } from './dto/create-shot.dto';
import { UpdateShotDto } from './dto/update-shot.dto';
import { IShotService } from './interfaces/shot.interface';
import { TRANSACTION_PACKAGE } from 'src/common/const/servers';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class ShotService {
  private shotService: IShotService

  constructor(
    @Inject(TRANSACTION_PACKAGE) private shotClient: ClientGrpc
  ) { }

  onModuleInit() {
    this.shotService = this.shotClient.getService<IShotService>('ShotService');
  }
  async create(createShotDto: CreateShotDto) {
    return this.shotService.create(createShotDto);
  }

  async findAll() {
    return this.shotService.findAll({});
  }

  async findOne(id: number) {
    return this.shotService.findOne({ id });
  }

  async findByUserId(userId: number) {
    return this.shotService.findByUserId({ userId });
  }

  async update(updateShotDto: UpdateShotDto) {
    return this.shotService.update(updateShotDto);
  }

  async remove(id: number) {
    return this.shotService.remove({ id });
  }
}
