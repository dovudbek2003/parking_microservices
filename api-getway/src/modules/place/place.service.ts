import { Inject, Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PARK_PACKAGE } from 'src/common/const/servers';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class PlaceService {
  private placeService: any;

  constructor(
    @Inject(PARK_PACKAGE) private placeClient: ClientGrpc
  ) { }

  onModuleInit() {
    this.placeService = this.placeClient.getService<any>('PlaceService');
  }
  create(createPlaceDto: CreatePlaceDto): Observable<string> {
    return this.placeService.create(createPlaceDto);
  }

  findAll(): Observable<string> {
    return this.placeService.findAll({});
  }

  findOne(id: number): Observable<string> {
    return this.placeService.findOne({ id });
  }

  update(updatePlaceDto: UpdatePlaceDto): Observable<string> {
    return this.placeService.update(updatePlaceDto);
  }

  remove(id: number): Observable<string> {
    return this.placeService.remove({ id });
  }
}
