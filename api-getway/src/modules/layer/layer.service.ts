import { Inject, Injectable } from '@nestjs/common';
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';
import { PARK_PACKAGE } from 'src/common/const/servers';
import { ClientGrpc } from '@nestjs/microservices';


@Injectable()
export class LayerService {
  private layerService: any;

  constructor(
    @Inject(PARK_PACKAGE) private layerClient: ClientGrpc,
  ) { }

  onModuleInit() {
    this.layerService = this.layerClient.getService<any>('LayerService');
  }
  async create(createLayerDto: CreateLayerDto) {
    return this.layerService.create(createLayerDto);
  }

  async findAll() {
    return this.layerService.findAll({});
  }

  async findOne(id: number) {
    return this.layerService.findOne({ id });
  }

  async update(id: number, updateLayerDto: UpdateLayerDto) {
    return this.layerService.update({ ...updateLayerDto, id: id });
  }

  async remove(id: number) {
    return this.layerService.remove({ id });
  }
}
