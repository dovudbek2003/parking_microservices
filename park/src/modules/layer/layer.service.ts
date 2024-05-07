import { Inject, Injectable } from '@nestjs/common';
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';
import { ILayerRepository } from './interfaces/layer.repository';
import { ILayerService } from './interfaces/layer.service';
import { ResponseData } from 'src/lib/response-data';
import { Layer } from './entities/layer.entity';
import { Park } from '../park/entities/park.entity';
import { FloorOrNameMustBeEntered, LayerNotFound } from './exception/layer.exception';

@Injectable()
export class LayerService implements ILayerService {
  constructor(@Inject('ILayerRepository') private readonly layerRepository: ILayerRepository) { }

  // CREATE
  async create(createLayerDto: CreateLayerDto, foundPark: Park): Promise<ResponseData<Layer>> {
    if (!createLayerDto.floor && !createLayerDto.name) {
      throw new FloorOrNameMustBeEntered()
    }

    const newLayer = new Layer()
    newLayer.name = createLayerDto.name;
    newLayer.floor = createLayerDto.floor;
    newLayer.parkId = createLayerDto.parkId;
    newLayer.park = foundPark;

    const createdLayer = await this.layerRepository.create(newLayer);

    return new ResponseData<Layer>('create', 201, createdLayer)
  }

  // READ
  async findAll(): Promise<ResponseData<Layer[]>> {
    const layers = await this.layerRepository.findAll();
    return new ResponseData<Array<Layer>>('findAll', 200, layers)
  }
  async findOne(id: number): Promise<ResponseData<Layer>> {
    const layer = await this.layerRepository.findOne(id);
    if (!layer) {
      throw new LayerNotFound()
    }

    return new ResponseData<Layer>('get one', 200, layer)
  }

  // UPDATE
  async update(id: number, updateLayerDto: UpdateLayerDto, foundPark: Park): Promise<ResponseData<Layer>> {
    const { data: foundLayer } = await this.findOne(id)

    foundLayer.name = updateLayerDto.name ? updateLayerDto.name : foundLayer.name;
    foundLayer.floor = updateLayerDto.floor ? updateLayerDto.floor : foundLayer.floor;

    if (foundPark) {
      foundLayer.park = foundPark;
      foundLayer.parkId = updateLayerDto.parkId;
    }

    const updatedLayer = await this.layerRepository.update(foundLayer);
    return new ResponseData<Layer>('update', 200, updatedLayer)
  }

  // DELETE
  async remove(id: number): Promise<ResponseData<Layer>> {
    await this.findOne(id)
    const deletedLayer = await this.layerRepository.remove(id);
    return new ResponseData<Layer>('delete', 200, deletedLayer)
  }
}
