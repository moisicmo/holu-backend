import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateBranchDto {

  @IsString()
  @ApiProperty({
    example: '1',
    description: 'Identificador del tenant',
  })
  tenantId: string;

  @IsString()
  @ApiProperty({
    example: 'tenant 1',
    description: 'Nombre del tenant',
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'tenant 1',
    description: 'Nombre del tenant',
  })
  city: string;

  @IsString()
  @ApiProperty({
    example: 'tenant 1',
    description: 'Nombre del tenant',
  })
  zone: string;

  @IsString()
  @ApiProperty({
    example: 'tenant 1',
    description: 'Nombre del tenant',
  })
  detail: string;
}
