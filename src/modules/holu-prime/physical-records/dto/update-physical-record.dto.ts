import { PartialType } from '@nestjs/swagger';
import { CreatePhysicalRecordDto } from './create-physical-record.dto';

export class UpdatePhysicalRecordDto extends PartialType(CreatePhysicalRecordDto) {}
