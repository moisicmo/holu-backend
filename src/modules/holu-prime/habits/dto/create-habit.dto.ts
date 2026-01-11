import { HabitType } from "@/generated/prisma/enums";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, IsUUID } from "class-validator";

export class CreateHabitDto {
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

  @IsEnum(HabitType)
  @ApiProperty({
    example: HabitType.general,
    description: 'Nombre del tenant',
    enum: HabitType,
  })
  type: HabitType;
}
