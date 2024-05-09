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
  async create(createPlaceDto: CreatePlaceDto) {
    return this.placeService.create(createPlaceDto);
  }

  async findAll() {
    return this.placeService.findAll({});
  }

  async findOne(id: number) {
    return this.placeService.findOne({ id });
  }

  async update(updatePlaceDto: UpdatePlaceDto) {
    return this.placeService.update(updatePlaceDto);
  }

  async remove(id: number) {
    return this.placeService.remove({ id });
  }
}
