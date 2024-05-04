import { PartialType } from '@nestjs/mapped-types';
import { CreateLayerDto } from './create-layer.dto';

export class UpdateLayerDto extends PartialType(CreateLayerDto) {}
