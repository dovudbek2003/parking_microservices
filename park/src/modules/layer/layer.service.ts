import { Injectable } from '@nestjs/common';
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';

@Injectable()
export class LayerService {
  create(createLayerDto: CreateLayerDto) {
    return 'This action adds a new layer';
  }

  findAll() {
    return `This action returns all layer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} layer`;
  }

  update(id: number, updateLayerDto: UpdateLayerDto) {
    return `This action updates a #${id} layer`;
  }

  remove(id: number) {
    return `This action removes a #${id} layer`;
  }
}
