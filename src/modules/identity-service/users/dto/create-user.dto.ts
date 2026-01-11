import { AuthProviderType } from "@/common";
import { Gender } from "@/generated/prisma/enums";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsString,
} from "class-validator";

export class CreateUserDto {
  
  @IsEnum(AuthProviderType)
  @ApiProperty({
    example: AuthProviderType.email,
    description: 'Tipo de proveedor de autenticación',
    enum: AuthProviderType,
  })
  provider: AuthProviderType;

  @IsString()
  @ApiProperty({ example: 'https://holufitserve-production.up.railway.app/static/animals/crocodile.png', description: 'url de la imagen' })
  image: string;

  @IsString()
  @ApiProperty({ example: 'maria', description: 'Nombre del usuario' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'perez', description: 'Apellido del usuario' })
  lastName: string;

  @IsEmail()
  @ApiProperty({ example: 'maria@gmail.com', description: 'Correo electrónico del usuario' })
  email: string;

  @IsString()
  @ApiProperty({ example: '123123', description: 'Número de documento del usuario' })
  numberDocument: string;

  @Type(() => Date)
  @IsDate()
  @ApiProperty({ example: '1990-05-20T00:00:00.000Z', description: 'Fecha de nacimiento del usuario' })
  birthDate?: Date;

  @IsString()
  @ApiProperty({ example: '123123', description: 'Contraseña del usuario' })
  password!: string;

  @IsEnum(Gender)
  @ApiProperty({ example: Gender.female, description: 'Género del usuario', enum: Gender })
  gender?: Gender;

}

