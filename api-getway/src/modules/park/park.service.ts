import { Inject, Injectable } from '@nestjs/common';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { PARK_PACKAGE } from 'src/common/const/servers';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class ParkService {
  private parkService: any;
  constructor(  
    @Inject(PARK_PACKAGE) private parkClient: ClientGrpc
  ) { }

  onModuleInit() {
    this.parkService = this.parkClient.getService<any>('ParkService');
  }
  create(createParkDto: CreateParkDto): Observable<string> {
    return this.parkService.create(createParkDto);
  }

  findAll(): Observable<string> {
    return this.parkService.findAll({});
  }

  findOne(id: number): Observable<string> {
    return this.parkService.findOne({ id });
  }

  update(updateParkDto: UpdateParkDto): Observable<string> {
    return this.parkService.update(updateParkDto);
  }

  remove(id: number): Observable<string> {
    return this.parkService.remove({ id });
  }
}
