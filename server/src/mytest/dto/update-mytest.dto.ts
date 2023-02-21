import { PartialType } from '@nestjs/mapped-types';
import { CreateMytestDto } from './create-mytest.dto';

export class UpdateMytestDto extends PartialType(CreateMytestDto) {}
