import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTenantDto {

  @IsString()
  @ApiProperty({
    example: '1',
    description: 'Identificador del template',
  })
  templateId: string;

  @IsString()
  @ApiProperty({
    example: 'tenant 1',
    description: 'Nombre del tenant',
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'mitienda',
    description: 'subdominio',
  })
  subdomain: string;
}
