import { Inject, Injectable } from '@nestjs/common';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { PARK_PACKAGE } from 'src/common/const/servers';
import { ClientGrpc } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { Redis } from 'src/common/enums/redis.enum';


@Injectable()
export class ParkService {
  private parkService: any;
  constructor(
    @Inject(PARK_PACKAGE) private parkClient: ClientGrpc,
    @Inject("CACHE_MANAGER") private cacheManager: Cache,
  ) { }

  onModuleInit() {
    this.parkService = this.parkClient.getService<any>('ParkService');
  }
  async create(createParkDto: CreateParkDto) {
    await this.cacheManager.del(Redis.ALL_PARKS)
    return this.parkService.create(createParkDto);
  }

  async findAll() {
    return this.parkService.findAll({});
  }

  async findOne(id: number) {
    return this.parkService.findOne({ id });
  }

  async update(updateParkDto: UpdateParkDto) {
    await this.cacheManager.del(Redis.ALL_PARKS)
    return this.parkService.update(updateParkDto);
  }

  async remove(id: number) {
    await this.cacheManager.del(Redis.ALL_PARKS)
    return this.parkService.remove({ id });
  }
}
