import { AuthProviderType } from "@/common";
import { ApiProperty } from "@nestjs/swagger";
import {
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
  @ApiProperty({ example: 'https://holu-backend-production.up.railway.app/static/avatars/crocodile.png', description: 'url de la imagen' })
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
  @ApiProperty({ example: '123123', description: 'Contraseña del usuario' })
  password!: string;

}

