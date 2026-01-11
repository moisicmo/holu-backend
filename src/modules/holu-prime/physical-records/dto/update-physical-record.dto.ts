import { PartialType } from '@nestjs/swagger';
import { CreatePhisicalRecordDto } from './create-physical-record.dto';

export class UpdatePhisicalRecordDto extends PartialType(CreatePhisicalRecordDto) {}
