import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTemplateDto {
  @IsString()
  @ApiProperty({
    example: 'tenant 1',
    description: 'Nombre de la plantilla',
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'tenant 1',
    description: 'tipo de plantilla',
  })
  type: string;
}
