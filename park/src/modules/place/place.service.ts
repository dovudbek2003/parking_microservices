import { Inject, Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { IPlaceService } from './interfaces/place.service';
import { ResponseData } from 'src/lib/response-data';
import { Place } from './entities/place.entity';
import { Layer } from '../layer/entities/layer.entity';
import { IPlaceRepository } from './interfaces/place.repository';
import { PlaceNotFound } from './exception/place.exception';

@Injectable()
export class PlaceService implements IPlaceService {
  constructor(@Inject('IPlaceRepository') private placeRepository: IPlaceRepository) { }

  // CREATE
  async create(createPlaceDto: CreatePlaceDto): Promise<ResponseData<Place>> {
    const newPlace = new Place()
    newPlace.name = createPlaceDto.name;
    newPlace.price = createPlaceDto.price;
    newPlace.layerId = createPlaceDto.layerId;

    const createdPlace = await this.placeRepository.create(newPlace);
    return new ResponseData<Place>('create', 201, createdPlace)
  }

  // READ
  async findAll(): Promise<ResponseData<Place[]>> {
    const places = await this.placeRepository.findAll();
    return new ResponseData<Array<Place>>('get all', 200, places)
  }
  async findOne(id: number): Promise<ResponseData<Place>> {
    const place = await this.placeRepository.findOne(id);
    if (!place) {
      throw new PlaceNotFound()
    }

    return new ResponseData<Place>('get one', 200, place)
  }

  // UPDATE
  async update(id: number, updatePlaceDto: CreatePlaceDto): Promise<ResponseData<Place>> {
    const { data: foundPlace } = await this.findOne(id)
    foundPlace.name = updatePlaceDto.name ? updatePlaceDto.name : foundPlace.name;
    foundPlace.price = updatePlaceDto.price ? updatePlaceDto.price : foundPlace.price;
    foundPlace.layerId = updatePlaceDto.layerId ? updatePlaceDto.layerId : foundPlace.layerId;

    const updatedPlace = await this.placeRepository.update(foundPlace);
    return new ResponseData<Place>('update', 200, updatedPlace)
  }

  // DELETE
  async remove(id: number): Promise<ResponseData<Place>> {
    await this.findOne(id)
    const deletedPlace = await this.placeRepository.remove(id);
    return new ResponseData<Place>('delete', 200, deletedPlace)
  }
}
