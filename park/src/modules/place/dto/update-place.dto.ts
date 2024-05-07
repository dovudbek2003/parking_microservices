import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaceDto } from './create-place.dto';

export class UpdatePlaceDto extends CreatePlaceDto {
    id: number;
}
