import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class CreateActivityDto {
  @IsUUID()
  @ApiProperty({
    example: 1,
    description: 'Identificador del usuario',
  })
  userId: string;

  @IsString()
  @ApiProperty({
    example: 'tenant 1',
    description: 'Nombre del tenant',
  })
  title: string;

  @IsString()
  @ApiProperty({
    example: 'tenant 1',
    description: 'Nombre del tenant',
  })
  time: string;
}
