import { Inject, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PARK_PACKAGE } from 'src/common/const/servers';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class ServiceService {
  private serviceService: any;
  constructor(
    @Inject(PARK_PACKAGE) private serviceClient: ClientGrpc
  ) { }

  onModuleInit() {
    this.serviceService = this.serviceClient.getService<any>('ServiceService');
  }
  async create(createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  async findAll() {
    return this.serviceService.findAll({});
  }

  async findOne(id: number) {
    return this.serviceService.findOne({ id });
  }

  async update(updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(updateServiceDto);
  }

  async remove(id: number) {
    return this.serviceService.remove({ id });
  }
}
