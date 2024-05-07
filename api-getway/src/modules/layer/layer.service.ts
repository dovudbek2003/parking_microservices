import { Inject, Injectable } from '@nestjs/common';
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';
import { PARK_PACKAGE } from 'src/common/const/servers';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable()
export class LayerService {
  private layerService: any;

  constructor(
    @Inject(PARK_PACKAGE) private layerClient: ClientGrpc
  ) { }

  onModuleInit() {
    this.layerService = this.layerClient.getService<any>('LayerService');
  }
  create(createLayerDto: CreateLayerDto): Observable<string> {
    return this.layerService.create(createLayerDto);
  }

  findAll(): Observable<string> {
    return this.layerService.findAll({});
  }

  findOne(id: number): Observable<string> {
    return this.layerService.findOne({ id });
  }

  update(id: number, updateLayerDto: UpdateLayerDto): Observable<string> {
    return this.layerService.update({ ...updateLayerDto, id: id });
  }

  remove(id: number): Observable<string> {
    return this.layerService.remove({ id });
  }
}
