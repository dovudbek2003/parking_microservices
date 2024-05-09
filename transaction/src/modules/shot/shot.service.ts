import { Inject, Injectable } from '@nestjs/common';
import { CreateShotDto } from './dto/create-shot.dto';
import { UpdateShotDto } from './dto/update-shot.dto';
import { IShotService } from './interfaces/shot.service';
import { IShotRepository } from './interfaces/shot.repository';
import { ResponseData } from 'src/lib/response-data';
import { Shot } from './entities/shot.entity';
import { ShotNotFound } from './exception/shot.exception';

@Injectable()
export class ShotService implements IShotService {
  constructor(@Inject('IShotRepository') private readonly shotRepository: IShotRepository) { }

  // CREATE
  async create(createShotDto: CreateShotDto): Promise<ResponseData<Shot>> {
    const newShot = new Shot()

    newShot.userId = createShotDto.userId;
    newShot.amount = createShotDto.amount;

    const createdShot = await this.shotRepository.create(newShot)

    return new ResponseData<Shot>('create', 201, createdShot)
  }

  // READ
  async findAll(): Promise<ResponseData<Shot[]>> {
    const shots = await this.shotRepository.findAll()
    return new ResponseData<Array<Shot>>('findAll', 200, shots)
  }
  async findOne(id: number): Promise<ResponseData<Shot>> {
    const shot = await this.shotRepository.findOne(id);
    if (!shot) {
      throw new ShotNotFound()
    }
    return new ResponseData<Shot>('findOne', 200, shot)
  }
  async _findByUserId(userId: number): Promise<Shot> {
    const foundShot = await this.shotRepository.findByUserId(userId)
    if (!foundShot) {
      throw new ShotNotFound()
    }
    return foundShot
  }

  // UPDATE
  async update(id: number, updateShotDto: UpdateShotDto): Promise<ResponseData<Shot>> {
    const { data: foundShot } = await this.findOne(id)

    foundShot.userId = updateShotDto.userId ? updateShotDto.userId : foundShot.userId;
    foundShot.amount = updateShotDto.amount ? updateShotDto.amount : foundShot.amount;

    const updatedShot = await this.shotRepository.update(foundShot)

    return new ResponseData<Shot>('update', 200, updatedShot)
  }

  // DELETE
  async remove(id: number): Promise<ResponseData<Shot>> {
    await this.findOne(id);
    const deletedShot = await this.shotRepository.remove(id);
    return new ResponseData<Shot>('delete', 200, deletedShot)
  }
}
