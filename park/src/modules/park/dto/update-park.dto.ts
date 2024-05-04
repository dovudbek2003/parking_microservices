import { PartialType } from '@nestjs/mapped-types';
import { CreateParkDto } from './create-park.dto';

export class UpdateParkDto extends PartialType(CreateParkDto) {}
