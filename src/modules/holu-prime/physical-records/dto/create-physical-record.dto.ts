import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreatePhysicalRecordDto {

  @IsUUID()
  @ApiProperty({
    example: '1',
    description: 'Identificador del tenant',
  })
  userId: string;

  @IsNumber()
  @ApiProperty({
    example: 70,
    description: 'peso del usuario',
  })
  weightKg: number;

  @IsNumber()
  @ApiProperty({
    example: 170.0,
    description: 'tamaño del usuario',
  })
  heightCm: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'este mes aumente de peso',
    description: 'nota de registro físico',
  })
  note?: string;
}
