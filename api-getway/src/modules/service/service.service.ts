import { Inject, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PARK_PACKAGE } from 'src/common/const/servers';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class ServiceService {
  private serviceService: any;
  constructor(  
    @Inject(PARK_PACKAGE) private serviceClient: ClientGrpc
  ) { }

  onModuleInit() {
    this.serviceService = this.serviceClient.getService<any>('ServiceService');
  }
  create(createServiceDto: CreateServiceDto): Observable<string> {
    return this.serviceService.create(createServiceDto);
  }

  findAll(): Observable<string> {
    return this.serviceService.findAll({});
  }

  findOne(id: number): Observable<string> {
    return this.serviceService.findOne({ id });
  }

  update(updateServiceDto: UpdateServiceDto): Observable<string> {
    return this.serviceService.update(updateServiceDto);
  }

  remove(id: number): Observable<string> {
    return this.serviceService.remove({ id });
  }
}
