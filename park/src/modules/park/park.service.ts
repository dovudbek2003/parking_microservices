import { Inject, Injectable } from '@nestjs/common';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { IParkRepository } from './interfaces/park.repository';
import { IParkService } from './interfaces/park.service';
import { ResponseData } from 'src/lib/response-data';
import { Park } from './entities/park.entity';
import { ParkAlreadyExists, ParkNotFound } from './exception/park.exception';

@Injectable()
export class ParkService implements IParkService {
  constructor(
    @Inject('IParkRepository') private readonly parkRepository: IParkRepository
  ) { }

  // CREATE
  async create(createParkDto: CreateParkDto): Promise<ResponseData<Park>> {
    const foundParkByName = await this._findByName(createParkDto.name);
    if (foundParkByName) {
      throw new ParkAlreadyExists()
    }

    const newPark = new Park()

    newPark.name = createParkDto.name;
    newPark.owner = createParkDto.owner;
    newPark.image = createParkDto.image;

    const createdPark = await this.parkRepository.create(newPark);

    return new ResponseData<Park>('create', 201, createdPark)
  }

  // READE
  async findAll(): Promise<ResponseData<Park[]>> {
    const parks = await this.parkRepository.findAll();
    return new ResponseData<Array<Park>>('get all', 200, parks)
  }
  async findOne(id: number): Promise<ResponseData<Park>> {
    const park = await this.parkRepository.findOne(id);
    if (!park) {
      throw new ParkNotFound()
    }

    return new ResponseData<Park>('get one', 200, park)
  }
  async _findByName(name: string): Promise<Park | null> {
    return this.parkRepository.findByName(name)
  }

  // UPDATE
  async update(id: number, updateParkDto: UpdateParkDto): Promise<ResponseData<Park>> {
    const { data: foundPark } = await this.findOne(id)
    const foundParkByName = await this._findByName(updateParkDto.name)

    if (foundParkByName && foundPark.id !== foundParkByName.id) {
      throw new ParkAlreadyExists()
    }

    foundPark.name = updateParkDto.name ? updateParkDto.name : foundPark.name;
    foundPark.owner = updateParkDto.owner ? updateParkDto.owner : foundPark.owner;
    foundPark.image = updateParkDto.image ? updateParkDto.image : foundPark.image;

    const updatedPark = await this.parkRepository.update(foundPark);

    return new ResponseData<Park>('update', 200, updatedPark)
  }

  // DELETE
  async remove(id: number): Promise<ResponseData<Park>> {
    await this.findOne(id)
    const deletedPark = await this.parkRepository.remove(id);
    return new ResponseData<Park>('delete', 200, deletedPark)
  }
}
