import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreateRadioDto {

  @IsUUID()
  @ApiProperty({
    example: 1,
    description: 'Nombre de la radio',
  })
  categoryId: string;

  @IsString()
  @ApiProperty({
    example: 'radio 1',
    description: 'Nombre de la radio',
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'radio 1',
    description: 'Nombre de la radio',
  })
  url: string;

  @IsString()
  @ApiProperty({
    example: 'radio 1',
    description: 'Nombre de la radio',
  })
  image: string;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'Nombre de la radio',
  })
  bitrate: number;

  @IsString()
  @ApiProperty({
    example: 'radio 1',
    description: 'Nombre de la radio',
  })
  codec: string;

}
